import { User } from '../models/User.model';
import { BaseRepository } from './base.repository';

class UserRepository extends BaseRepository<typeof User> {
  constructor() {
    super(User as any);
  }

  async findByEmail(email: string) {
    return await User.findOne({ email });
  }

  async findActive() {
    return await User.find({ isActive: true });
  }

  async updateLastLogin(userId: string) {
    return await User.findByIdAndUpdate(userId, { lastLogin: new Date() });
  }
}

export const userRepository = new UserRepository();
