import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const uri = process.env.HRMS_MONGO_URI || process.env.HRMS_MONGO_URL;

async function run() {
  if (!uri) {
    console.error('HRMS_MONGO_URI or HRMS_MONGO_URL not found in .env');
    return;
  }

  console.log('Connecting to HRMS MongoDB...');
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Successfully connected to MongoDB');
    
    const db = client.db();
    console.log(`Connected to database: ${db.databaseName}`);

    const collections = await db.listCollections().toArray();
    console.log('Collections in database:');
    collections.forEach(c => console.log(` - ${c.name}`));

    const userCol = db.collection('users');
    const userSample = await userCol.findOne({});
    if (userSample) {
      console.log('Sample from "users" collection (fields):');
      console.log(Object.keys(userSample).join(', '));
      console.log(`isActive field: ${userSample.isActive !== undefined ? 'exists' : 'MISSING'}`);
      console.log(`password field: ${userSample.password !== undefined ? 'exists' : 'MISSING'}`);
      console.log(`passwordHash field: ${userSample.passwordHash !== undefined ? 'exists' : 'MISSING'}`);
      console.log(`password_hash field: ${userSample.password_hash !== undefined ? 'exists' : 'MISSING'}`);
    } else {
      console.log('No documents found in "users" collection');
    }

    const empCol = db.collection('employees');
    const empSample = await empCol.findOne({});
    if (empSample) {
      console.log('Sample from "employees" collection (fields):');
      console.log(Object.keys(empSample).join(', '));
      console.log(`is_active field: ${empSample.is_active !== undefined ? 'exists' : 'MISSING'}`);
      console.log(`email field: ${empSample.email !== undefined ? 'exists' : 'MISSING'}`);
    } else {
      console.log('No documents found in "employees" collection');
    }

  } catch (err) {
    console.error('An error occurred:', err.message);
  } finally {
    await client.close();
  }
}

run();
