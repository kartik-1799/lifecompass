import { Content } from '../models/Content.model';
import { AppError } from '../middlewares/error.middleware';
import { HTTP_STATUS, ERROR_MESSAGES } from '../config/constants';
import { PaginationParams } from '../types';

export class ContentService {
  async create(userId: string, data: any) {
    const content = await Content.create({
      ...data,
      createdBy: userId,
    });
    return content;
  }

  async getAll(filters: any = {}, pagination: PaginationParams) {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
    
    const query: any = { isPublic: true };
    
    if (filters.type) {
      query.type = filters.type;
    }
    
    if (filters.category) {
      query.category = filters.category;
    }
    
    if (filters.difficulty) {
      query.difficulty = filters.difficulty;
    }
    
    if (filters.tags && filters.tags.length > 0) {
      query.tags = { $in: filters.tags };
    }
    
    if (filters.search) {
      query.$or = [
        { title: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } },
        { author: { $regex: filters.search, $options: 'i' } },
      ];
    }
    
    const skip = (page - 1) * limit;
    const sortOptions: any = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
    
    const [items, total] = await Promise.all([
      Content.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit),
      Content.countDocuments(query),
    ]);
    
    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getById(id: string) {
    const content = await Content.findById(id);
    
    if (!content) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Content not found');
    }
    
    // Increment view count
    content.metadata.views += 1;
    await content.save();
    
    return content;
  }

  async update(id: string, userId: string, data: any) {
    const content = await Content.findOne({ _id: id, createdBy: userId });
    
    if (!content) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Content not found or unauthorized');
    }
    
    Object.assign(content, data);
    await content.save();
    
    return content;
  }

  async delete(id: string, userId: string) {
    const content = await Content.findOneAndDelete({ _id: id, createdBy: userId });
    
    if (!content) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Content not found or unauthorized');
    }
    
    return content;
  }

  async incrementLike(id: string) {
    const content = await Content.findById(id);
    
    if (!content) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Content not found');
    }
    
    content.metadata.likes += 1;
    await content.save();
    
    return content;
  }

  async incrementCompletion(id: string) {
    const content = await Content.findById(id);
    
    if (!content) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Content not found');
    }
    
    content.metadata.completions += 1;
    await content.save();
    
    return content;
  }

  async getByCategory(category: string, pagination: PaginationParams) {
    return this.getAll({ category }, pagination);
  }

  async getByType(type: string, pagination: PaginationParams) {
    return this.getAll({ type }, pagination);
  }

  async searchByTags(tags: string[], pagination: PaginationParams) {
    return this.getAll({ tags }, pagination);
  }
}

export const contentService = new ContentService();
