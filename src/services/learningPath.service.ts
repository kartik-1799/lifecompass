import { LearningPath } from '../models/LearningPath.model';
import { AppError } from '../middlewares/error.middleware';
import { HTTP_STATUS, ERROR_MESSAGES } from '../config/constants';
import { PaginationParams } from '../types';

export class LearningPathService {
  async create(userId: string, data: any) {
    const learningPath = await LearningPath.create({
      ...data,
      userId,
    });
    return learningPath;
  }

  async getAll(userId: string, filters: any = {}, pagination: PaginationParams) {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
    
    const query: any = { userId };
    
    if (filters.status) {
      query.status = filters.status;
    }
    
    if (filters.category) {
      query.category = filters.category;
    }
    
    if (filters.search) {
      query.$or = [
        { title: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } },
      ];
    }
    
    const skip = (page - 1) * limit;
    const sortOptions: any = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
    
    const [items, total] = await Promise.all([
      LearningPath.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .populate('content.contentId'),
      LearningPath.countDocuments(query),
    ]);
    
    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getById(id: string, userId: string) {
    const learningPath = await LearningPath.findOne({ _id: id, userId })
      .populate('content.contentId');
      
    if (!learningPath) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Learning path not found');
    }
    
    return learningPath;
  }

  async update(id: string, userId: string, data: any) {
    const learningPath = await LearningPath.findOneAndUpdate(
      { _id: id, userId },
      data,
      { new: true, runValidators: true }
    );
    
    if (!learningPath) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Learning path not found');
    }
    
    return learningPath;
  }

  async delete(id: string, userId: string) {
    const learningPath = await LearningPath.findOneAndDelete({ _id: id, userId });
    
    if (!learningPath) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Learning path not found');
    }
    
    return learningPath;
  }

  async updateProgress(id: string, userId: string, contentId: string) {
    const learningPath = await LearningPath.findOne({ _id: id, userId });
    
    if (!learningPath) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Learning path not found');
    }
    
    const contentItem = learningPath.content.find(
      (item) => item.contentId.toString() === contentId
    );
    
    if (!contentItem) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Content not found in learning path');
    }
    
    contentItem.completed = true;
    contentItem.completedAt = new Date();
    
    // Calculate progress
    const completedItems = learningPath.content.filter((item) => item.completed).length;
    learningPath.progress = (completedItems / learningPath.content.length) * 100;
    
    // Update status
    if (learningPath.progress === 100) {
      learningPath.status = 'completed';
      learningPath.completedAt = new Date();
    } else if (learningPath.progress > 0 && learningPath.status === 'not_started') {
      learningPath.status = 'in_progress';
      learningPath.startedAt = new Date();
    }
    
    await learningPath.save();
    
    return learningPath;
  }

  async addContent(id: string, userId: string, contentId: string, order: number) {
    const learningPath = await LearningPath.findOne({ _id: id, userId });
    
    if (!learningPath) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Learning path not found');
    }
    
    learningPath.content.push({
      contentId: contentId as any,
      order,
      completed: false,
    });
    
    await learningPath.save();
    
    return learningPath;
  }

  async removeContent(id: string, userId: string, contentId: string) {
    const learningPath = await LearningPath.findOne({ _id: id, userId });
    
    if (!learningPath) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Learning path not found');
    }
    
    learningPath.content = learningPath.content.filter(
      (item) => item.contentId.toString() !== contentId
    );
    
    await learningPath.save();
    
    return learningPath;
  }
}

export const learningPathService = new LearningPathService();
