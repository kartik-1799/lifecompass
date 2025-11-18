import { connectDatabase, disconnectDatabase } from '../src/config/database';
import mongoose from 'mongoose';

async function resetDatabase() {
  await connectDatabase();
  console.log('Resetting database...');
  await mongoose.connection.dropDatabase();
  await disconnectDatabase();
  console.log('Database reset complete!');
}

resetDatabase();
