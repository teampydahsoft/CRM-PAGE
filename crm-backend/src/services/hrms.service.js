import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import { getHRMSDb } from '../config/database.js';

/**
 * HRMS Service
 * Resolves CRM users to HRMS User/Employee identities for SSO verify-token response.
 * Validates HRMS login credentials when user signs in via HRMS portal.
 * Uses HRMS MongoDB connection from config/database.js (when HRMS_MONGO_URI is set).
 */

/**
 * Get password hash from HRMS user doc (supports password, passwordHash, password_hash).
 */
function getPasswordHash(doc) {
  if (!doc) return null;
  return doc.password || doc.passwordHash || doc.password_hash || null;
}

/**
 * Find HRMS User or Employee by _id (for verify-token when databaseSource is hrms).
 * @param {string} userId - HRMS _id as string (24-char hex)
 * @returns {Promise<{ email?: string, name?: string, employeeId?: string }|null>}
 */
export const getHRMSUserById = async (userId) => {
  if (!userId || typeof userId !== 'string') return null;
  const db = await getHRMSDb();
  if (!db) return null;
  let doc = null;
  try {
    if (/^[0-9a-fA-F]{24}$/.test(userId)) {
      const _id = new ObjectId(userId);
      doc = await db.collection('users').findOne({ _id });
      if (!doc) doc = await db.collection('employees').findOne({ _id });
    }
    if (!doc) return null;
    return {
      email: doc.email || null,
      name: doc.name || doc.employee_name || doc.username || null,
      employeeId: doc.employeeId || doc.emp_no || null
    };
  } catch (error) {
    console.error('[HRMS] getHRMSUserById error:', error.message);
    return null;
  }
};

/**
 * Validate HRMS credentials (for login when portalId is hrms).
 * Looks up User then Employee by email or username, verifies bcrypt password.
 * @param {string} username - Email or username
 * @param {string} password - Plain password
 * @returns {Promise<Object|null>} Normalized user { id, email, name, role, databaseSource: 'hrms' } or null
 */
export const validateHRMSCredentials = async (username, password) => {
  if (!username || !password) return null;
  const db = await getHRMSDb();
  if (!db) {
    console.log('[Auth] HRMS login requested but HRMS_MONGO_URI not configured');
    return null;
  }
  const userCol = db.collection('users');
  const empCol = db.collection('employees');
  const identifier = username.trim();

  try {
    // 1) User collection: by email or username, active only
    let doc = await userCol.findOne({
      $and: [
        { $or: [{ email: identifier }, { username: identifier }] },
        { $or: [{ isActive: true }, { isActive: { $exists: false } }] }
      ]
    });
    if (!doc) {
      doc = await userCol.findOne({
        $or: [{ email: identifier }, { username: identifier }]
      });
    }
    if (doc && getPasswordHash(doc)) {
      const valid = await bcrypt.compare(password, getPasswordHash(doc));
      if (valid) {
        console.log(`[Auth] HRMS user found: ${doc._id}, email: ${doc.email}`);
        return {
          id: doc._id.toString(),
          email: doc.email || null,
          name: doc.name || doc.username || null,
          role: doc.role || 'user',
          databaseSource: 'hrms'
        };
      }
    }

    // 2) Employee collection: by email, active only
    doc = await empCol.findOne({
      $and: [
        { email: identifier },
        { $or: [{ is_active: true }, { is_active: { $exists: false } }] }
      ]
    });
    if (!doc) {
      doc = await empCol.findOne({ email: identifier });
    }
    if (doc && getPasswordHash(doc)) {
      const valid = await bcrypt.compare(password, getPasswordHash(doc));
      if (valid) {
        console.log(`[Auth] HRMS employee found: ${doc._id}, email: ${doc.email}`);
        return {
          id: doc._id.toString(),
          email: doc.email || null,
          name: doc.employee_name || doc.name || null,
          role: doc.role || 'user',
          databaseSource: 'hrms'
        };
      }
    }

    console.log(`[Auth] HRMS: user not found or invalid password for: ${identifier}`);
    return null;
  } catch (error) {
    console.error('[HRMS] validateHRMSCredentials error:', error.message);
    return null;
  }
};

/**
 * Find HRMS User or Employee by email (and optionally by employee number).
 * HRMS resolves in order: _id (ObjectId), email, employeeId/emp_no, name.
 * @param {string} email - User email
 * @param {string} [employeeId] - Optional employee number (e.g. EMP001)
 * @returns {Promise<{ userId: string, email: string }|null>} HRMS _id as string and email, or null
 */
export const findHRMSUserByEmail = async (email, employeeId = null) => {
  if (!email || typeof email !== 'string') {
    return null;
  }
  const db = await getHRMSDb();
  if (!db) {
    return null;
  }
  const userCollection = db.collection('users');
  const employeeCollection = db.collection('employees');

  try {
    const normalizedEmail = email.trim();
    // 1) Try by email in User collection (only active users)
    let doc = await userCollection.findOne({
      email: normalizedEmail,
      $or: [{ isActive: true }, { isActive: { $exists: false } }]
    });
    if (doc && doc._id) {
      return { userId: doc._id.toString(), email: doc.email || email };
    }

    // 2) Try by email in Employee collection (only active)
    doc = await employeeCollection.findOne({
      email: normalizedEmail,
      $or: [{ is_active: true }, { is_active: { $exists: false } }]
    });
    if (doc && doc._id) {
      return { userId: doc._id.toString(), email: doc.email || email };
    }

    // 3) If we have employee number, try User.employeeId or Employee.emp_no (HRMS treats uppercase)
    if (employeeId && typeof employeeId === 'string') {
      const empNo = employeeId.trim().toUpperCase();
      doc = await userCollection.findOne({
        $or: [
          { employeeId: empNo },
          { employeeId: employeeId.trim() }
        ]
      });
      if (doc && doc._id) {
        return { userId: doc._id.toString(), email: doc.email || email };
      }
      doc = await employeeCollection.findOne({
        $or: [
          { emp_no: empNo },
          { emp_no: employeeId.trim() }
        ]
      });
      if (doc && doc._id) {
        return { userId: doc._id.toString(), email: doc.email || email };
      }
    }

    return null;
  } catch (error) {
    console.error('[HRMS] findHRMSUserByEmail error:', error.message);
    return null;
  }
};

export default {
  getHRMSUserById,
  validateHRMSCredentials,
  findHRMSUserByEmail,
};
