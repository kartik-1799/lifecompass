import mongoose, { Document, Schema } from 'mongoose';
import { LEARNING_PATH_STATUS } from '../config/constants';

export interface ILearningPath extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  category: string;
  tags: string[];
  content: Array<{
    contentId: mongoose.Types.ObjectId;
    order: number;
    completed: boolean;
    completedAt?: Date;
  }>;
  status: string;
  progress: number;
  estimatedDuration: number;
  startedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const learningPathSchema = new Schema<ILearningPath>(
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
    tags: [String],
    content: [
      {
        contentId: {
          type: Schema.Types.ObjectId,
          ref: 'Content',
        },
        order: Number,
        completed: {
          type: Boolean,
          default: false,
        },
        completedAt: Date,
      },
    ],
    status: {
      type: String,
      enum: Object.values(LEARNING_PATH_STATUS),
      default: LEARNING_PATH_STATUS.NOT_STARTED,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    estimatedDuration: Number,
    startedAt: Date,
    completedAt: Date,
  },
  {
    timestamps: true,
  }
);

learningPathSchema.index({ userId: 1, status: 1 });
learningPathSchema.index({ category: 1 });

export const LearningPath = mongoose.model<ILearningPath>('LearningPath', learningPathSchema);
