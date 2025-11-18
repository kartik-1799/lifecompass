import mongoose, { Document, Schema } from 'mongoose';
import { CONTENT_TYPES } from '../config/constants';

export interface IContent extends Document {
  title: string;
  description: string;
  type: string;
  url?: string;
  content?: string;
  author: string;
  category: string;
  tags: string[];
  duration?: number;
  difficulty: string;
  isPublic: boolean;
  createdBy: mongoose.Types.ObjectId;
  metadata: {
    views: number;
    likes: number;
    completions: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const contentSchema = new Schema<IContent>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(CONTENT_TYPES),
      required: true,
    },
    url: String,
    content: String,
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: [String],
    duration: Number,
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    metadata: {
      views: {
        type: Number,
        default: 0,
      },
      likes: {
        type: Number,
        default: 0,
      },
      completions: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

contentSchema.index({ category: 1, type: 1 });
contentSchema.index({ tags: 1 });
contentSchema.index({ isPublic: 1 });

export const Content = mongoose.model<IContent>('Content', contentSchema);
