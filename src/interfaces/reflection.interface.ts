import { Document } from 'mongoose';

export interface IReflectionBase {
  title: string;
  content: string;
  mood?: string;
  tags: string[];
}

export interface IReflectionDocument extends IReflectionBase, Document {}
