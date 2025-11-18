import { User } from '../src/models/User.model';
import { hashPassword } from '../src/utils/password.util';

export async function seed() {
  const users = [
    {
      email: 'admin@lifecompass.com',
      password: await hashPassword('Admin1234!'),
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
    },
  ];

  await User.insertMany(users);
  console.log('Users seeded');
}
