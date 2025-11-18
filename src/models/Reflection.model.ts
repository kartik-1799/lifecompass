import mongoose, { Document, Schema } from 'mongoose';

export interface IReflection extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  content: string;
  mood?: string;
  tags: string[];
  insights: string[];
  linkedGoals: mongoose.Types.ObjectId[];
  linkedContent: mongoose.Types.ObjectId[];
  isPrivate: boolean;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const reflectionSchema = new Schema<IReflection>(
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
    content: {
      type: String,
      required: true,
    },
    mood: {
      type: String,
      enum: ['great', 'good', 'okay', 'challenging', 'difficult'],
    },
    tags: [String],
    insights: [String],
    linkedGoals: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Goal',
      },
    ],
    linkedContent: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Content',
      },
    ],
    isPrivate: {
      type: Boolean,
      default: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

reflectionSchema.index({ userId: 1, date: -1 });
reflectionSchema.index({ tags: 1 });

export const Reflection = mongoose.model<IReflection>('Reflection', reflectionSchema);
