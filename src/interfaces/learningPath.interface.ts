import { Document } from 'mongoose';

export interface ILearningPathBase {
  title: string;
  description: string;
  category: string;
  tags: string[];
  status: string;
  progress: number;
}

export interface ILearningPathDocument extends ILearningPathBase, Document {}
