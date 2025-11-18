import { User } from '../models/User.model';
import { AppError } from '../middlewares/error.middleware';
import { HTTP_STATUS, ERROR_MESSAGES } from '../config/constants';

export class UserService {
  async getProfile(userId: string) {
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.USER_NOT_FOUND);
    }

    return {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      preferences: user.preferences,
      profile: user.profile,
      createdAt: user.createdAt,
    };
  }

  async updateProfile(userId: string, data: any) {
    const allowedUpdates = ['firstName', 'lastName', 'profile'];
    const updates: any = {};

    Object.keys(data).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        updates[key] = data[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      userId,
      updates,
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.USER_NOT_FOUND);
    }

    return {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      preferences: user.preferences,
      profile: user.profile,
    };
  }

  async updatePreferences(userId: string, preferences: any) {
    const user = await User.findByIdAndUpdate(
      userId,
      { preferences },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.USER_NOT_FOUND);
    }

    return user.preferences;
  }
}

export const userService = new UserService();
