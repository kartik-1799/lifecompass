import { connectDatabase, disconnectDatabase } from '../src/config/database';
import { User } from '../src/models/User.model';

async function seed() {
  await connectDatabase();
  console.log('Seeding database...');
  // Add seed logic
  await disconnectDatabase();
  console.log('Seeding complete!');
}

seed();
