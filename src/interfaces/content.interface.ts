import { Document } from 'mongoose';

export interface IContentBase {
  title: string;
  description: string;
  type: string;
  category: string;
  tags: string[];
}

export interface IContentDocument extends IContentBase, Document {}
