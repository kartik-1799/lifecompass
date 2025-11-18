import mongoose, { Document, Schema } from 'mongoose';
import { GOAL_STATUS } from '../config/constants';

export interface IGoal extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  category: string;
  status: string;
  priority: string;
  targetDate?: Date;
  milestones: Array<{
    title: string;
    description: string;
    completed: boolean;
    completedAt?: Date;
    dueDate?: Date;
  }>;
  progress: number;
  notes: string[];
  linkedLearningPaths: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const goalSchema = new Schema<IGoal>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(GOAL_STATUS),
      default: GOAL_STATUS.ACTIVE,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    targetDate: Date,
    milestones: [
      {
        title: {
          type: String,
          required: true,
        },
        description: String,
        completed: {
          type: Boolean,
          default: false,
        },
        completedAt: Date,
        dueDate: Date,
      },
    ],
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    notes: [String],
    linkedLearningPaths: [
      {
        type: Schema.Types.ObjectId,
        ref: 'LearningPath',
      },
    ],
  },
  {
    timestamps: true,
  }
);

goalSchema.index({ userId: 1, status: 1 });
goalSchema.index({ category: 1 });

export const Goal = mongoose.model<IGoal>('Goal', goalSchema);
