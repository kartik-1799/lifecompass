import { Model, Document } from 'mongoose';

export class BaseRepository<T extends Document> {
  constructor(private model: Model<T>) {}

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id).exec();
  }

  async findOne(filter: any): Promise<T | null> {
    return await this.model.findOne(filter).exec();
  }

  async findMany(filter: any): Promise<T[]> {
    return await this.model.find(filter).exec();
  }

  async create(data: Partial<T>): Promise<T> {
    return await this.model.create(data);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return !!result;
  }

  async count(filter: any = {}): Promise<number> {
    return await this.model.countDocuments(filter).exec();
  }

  async exists(filter: any): Promise<boolean> {
    return !!(await this.model.exists(filter));
  }
}
