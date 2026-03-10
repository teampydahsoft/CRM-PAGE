import bcrypt from 'bcryptjs';
import { getTransportDb } from '../config/database.js';

/**
 * Transport Service
 * Handles authentication for the Transport Management portal.
 * Use the 'Admin' model/collection as the primary source of truth.
 */

/**
 * Validate Transport credentials (for login when portalId is transport-management).
 * Checks 'admins' collection for username and verifies password.
 * @param {string} username - Admin username
 * @param {string} password - Plain password
 * @returns {Promise<Object|null>} Normalized user { id, username, role: 'admin', databaseSource: 'transport' } or null
 */
export const validateTransportCredentials = async (username, password) => {
  if (!username || !password) return null;
  
  const db = await getTransportDb();
  if (!db) {
    console.log('[Auth-Transport] Transport login requested but TRANSPORT_MONGO_URI not configured');
    return null;
  }

  const adminCol = db.collection('admins');
  const identifier = username.trim();

  try {
    console.log(`[Auth-Transport] Checking admins collection for username: ${identifier}`);
    const admin = await adminCol.findOne({ username: identifier });

    if (admin) {
      console.log(`[Auth-Transport] Found admin user: ${admin.username}`);
      
      // The user provided a sample where password matching is done via bcrypt
      const isMatch = await bcrypt.compare(password, admin.password);
      
      if (isMatch) {
        console.log(`[Auth-Transport] Transport admin validated successfully: ${admin._id}`);
        return {
          id: admin._id.toString(),
          username: admin.username,
          name: admin.name || admin.username,
          role: 'admin',
          databaseSource: 'transport'
        };
      } else {
        console.log(`[Auth-Transport] Password mismatch for admin: ${admin.username}`);
      }
    } else {
      console.log(`[Auth-Transport] No admin found with username: ${identifier}`);
    }

    return null;
  } catch (error) {
    console.error('[Transport] validateTransportCredentials error:', error.message);
    return null;
  }
};

/**
 * Find Transport Admin by _id (for verify-token lookup).
 * @param {string} userId - Admin _id as string
 * @returns {Promise<Object|null>}
 */
export const getTransportUserById = async (userId) => {
  if (!userId) return null;
  const db = await getTransportDb();
  if (!db) return null;

  try {
    const { ObjectId } = await import('mongodb');
    const admin = await db.collection('admins').findOne({ _id: new ObjectId(userId) });
    if (!admin) return null;
    
    return {
      username: admin.username,
      name: admin.name || admin.username,
      email: admin.email || null
    };
  } catch (error) {
    console.error('[Transport] getTransportUserById error:', error.message);
    return null;
  }
};

export default {
  validateTransportCredentials,
  getTransportUserById
};
