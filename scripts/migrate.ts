import { connectDatabase, disconnectDatabase } from '../src/config/database';

async function migrate() {
  await connectDatabase();
  console.log('Running migrations...');
  // Add migration logic
  await disconnectDatabase();
  console.log('Migrations complete!');
}

migrate();
