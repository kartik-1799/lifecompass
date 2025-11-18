import mongoose, { Document, Schema } from 'mongoose';
import { USER_ROLES } from '../config/constants';

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  isEmailVerified: boolean;
  preferences: {
    theme: string;
    notifications: boolean;
    language: string;
  };
  profile: {
    avatar?: string;
    bio?: string;
    interests: string[];
    goals: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.USER,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    preferences: {
      theme: {
        type: String,
        default: 'light',
      },
      notifications: {
        type: Boolean,
        default: true,
      },
      language: {
        type: String,
        default: 'en',
      },
    },
    profile: {
      avatar: String,
      bio: String,
      interests: [String],
      goals: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1 });

export const User = mongoose.model<IUser>('User', userSchema);
