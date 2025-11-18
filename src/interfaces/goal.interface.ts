import { Document } from 'mongoose';

export interface IGoalBase {
  title: string;
  description: string;
  category: string;
  status: string;
  priority: string;
}

export interface IGoalDocument extends IGoalBase, Document {}
