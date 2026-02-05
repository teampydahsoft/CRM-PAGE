import mysql from 'mysql2/promise';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Database Configuration
 * MySQL connection pool setup for multiple databases
 * HRMS MongoDB connection (optional, for SSO verify-token user resolution)
 * Hostel MongoDB connection (optional, separate database for hostel software)
 */

let studentPool = null;
let admissionsPool = null;
let hrmsMongoClient = null;
let hrmsMongoDb = null;
let hostelMongoClient = null;
let hostelMongoDb = null;

/**
 * Create MySQL connection pool for student database
 */
export const createStudentPool = () => {
  if (studentPool) {
    return studentPool;
  }

  studentPool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'student_database',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  });

  return studentPool;
};

/**
 * Create MySQL connection pool for admissions database
 */
export const createAdmissionsPool = () => {
  if (admissionsPool) {
    return admissionsPool;
  }

  admissionsPool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME_ADMISSIONS || 'admissions_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  });

  return admissionsPool;
};

/**
 * Create MySQL connection pool (legacy - defaults to student database)
 */
export const createPool = () => {
  return createStudentPool();
};

/**
 * Connect to HRMS MongoDB (optional; when HRMS_MONGO_URI or HRMS_MONGO_URL is set)
 * @returns {Promise<import('mongodb').Db|null>} HRMS db instance or null
 */
export const connectHRMSMongo = async () => {
  const uri = process.env.HRMS_MONGO_URI || process.env.HRMS_MONGO_URL;
  if (!uri) {
    return null;
  }
  if (hrmsMongoClient) {
    return hrmsMongoDb;
  }
  try {
    hrmsMongoClient = new MongoClient(uri);
    await hrmsMongoClient.connect();
    hrmsMongoDb = hrmsMongoClient.db();
    console.log('✅ HRMS MongoDB connection established');
    return hrmsMongoDb;
  } catch (error) {
    console.error('❌ HRMS MongoDB connection error:', error.message);
    hrmsMongoClient = null;
    hrmsMongoDb = null;
    return null;
  }
};

/**
 * Initialize database connections
 */
export const connectDatabase = async () => {
  try {
    // Connect to student database
    studentPool = createStudentPool();
    const studentConnection = await studentPool.getConnection();
    await studentConnection.ping();
    studentConnection.release();
    console.log(`✅ Student database (${process.env.DB_NAME}) connection established`);

    // Connect to admissions database if configured
    if (process.env.DB_NAME_ADMISSIONS) {
      admissionsPool = createAdmissionsPool();
      const admissionsConnection = await admissionsPool.getConnection();
      await admissionsConnection.ping();
      admissionsConnection.release();
      console.log(`✅ Admissions database (${process.env.DB_NAME_ADMISSIONS}) connection established`);
    }

    // Connect to HRMS MongoDB if configured
    if (process.env.HRMS_MONGO_URI || process.env.HRMS_MONGO_URL) {
      await connectHRMSMongo();
    }

    // Connect to Hostel MongoDB if configured
    if (process.env.HOSTEL_MONGO_URI || process.env.HOSTEL_MONGO_URL) {
      await connectHostelMongo();
    }

    return { studentPool, admissionsPool, hrmsMongoDb, hostelMongoDb };
  } catch (error) {
    console.error('❌ Database connection error:', error);
    throw error;
  }
};

/**
 * Close database connection pools
 */
export const closeDatabase = async () => {
  try {
    if (studentPool) {
      await studentPool.end();
      studentPool = null;
      console.log('✅ Student database connection pool closed');
    }
    if (admissionsPool) {
      await admissionsPool.end();
      admissionsPool = null;
      console.log('✅ Admissions database connection pool closed');
    }
    if (hrmsMongoClient) {
      await hrmsMongoClient.close();
      hrmsMongoClient = null;
      hrmsMongoDb = null;
      console.log('✅ HRMS MongoDB connection closed');
    }
    if (hostelMongoClient) {
      await hostelMongoClient.close();
      hostelMongoClient = null;
      hostelMongoDb = null;
      console.log('✅ Hostel MongoDB connection closed');
    }
  } catch (error) {
    console.error('❌ Error closing database connection:', error);
    throw error;
  }
};

/**
 * Get student database pool instance
 */
export const getStudentPool = () => {
  if (!studentPool) {
    return createStudentPool();
  }
  return studentPool;
};

/**
 * Get admissions database pool instance
 */
export const getAdmissionsPool = () => {
  if (!admissionsPool) {
    return createAdmissionsPool();
  }
  return admissionsPool;
};

/**
 * Get database pool instance (legacy - defaults to student database)
 */
export const getPool = () => {
  return getStudentPool();
};

/**
 * Get HRMS MongoDB db instance (lazy connect if URI is set)
 * @returns {Promise<import('mongodb').Db|null>} HRMS db or null if not configured
 */
export const getHRMSDb = async () => {
  if (hrmsMongoDb) {
    return hrmsMongoDb;
  }
  return connectHRMSMongo();
};

/**
 * Connect to Hostel MongoDB (optional; when HOSTEL_MONGO_URI or HOSTEL_MONGO_URL is set)
 * @returns {Promise<import('mongodb').Db|null>} Hostel db instance or null
 */
export const connectHostelMongo = async () => {
  const uri = process.env.HOSTEL_MONGO_URI || process.env.HOSTEL_MONGO_URL;
  if (!uri) {
    return null;
  }
  if (hostelMongoClient) {
    return hostelMongoDb;
  }
  try {
    hostelMongoClient = new MongoClient(uri);
    await hostelMongoClient.connect();
    hostelMongoDb = hostelMongoClient.db();
    console.log('✅ Hostel MongoDB connection established');
    return hostelMongoDb;
  } catch (error) {
    console.error('❌ Hostel MongoDB connection error:', error.message);
    hostelMongoClient = null;
    hostelMongoDb = null;
    return null;
  }
};

/**
 * Get Hostel MongoDB db instance (lazy connect if URI is set)
 * @returns {Promise<import('mongodb').Db|null>} Hostel db or null if not configured
 */
export const getHostelDb = async () => {
  if (hostelMongoDb) {
    return hostelMongoDb;
  }
  return connectHostelMongo();
};

export default {
  createPool,
  createStudentPool,
  createAdmissionsPool,
  connectDatabase,
  closeDatabase,
  connectHRMSMongo,
  getHRMSDb,
  connectHostelMongo,
  getHostelDb,
  getPool,
  getStudentPool,
  getAdmissionsPool,
};
