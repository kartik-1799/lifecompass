import { Reflection } from '../models/Reflection.model';
import { AppError } from '../middlewares/error.middleware';
import { HTTP_STATUS, ERROR_MESSAGES } from '../config/constants';
import { PaginationParams } from '../types';

export class ReflectionService {
  async create(userId: string, data: any) {
    const reflection = await Reflection.create({
      ...data,
      userId,
    });
    return reflection;
  }

  async getAll(userId: string, filters: any = {}, pagination: PaginationParams) {
    const { page = 1, limit = 10, sortBy = 'date', sortOrder = 'desc' } = pagination;
    
    const query: any = { userId };
    
    if (filters.mood) {
      query.mood = filters.mood;
    }
    
    if (filters.tags && filters.tags.length > 0) {
      query.tags = { $in: filters.tags };
    }
    
    if (filters.startDate && filters.endDate) {
      query.date = {
        $gte: new Date(filters.startDate),
        $lte: new Date(filters.endDate),
      };
    }
    
    if (filters.search) {
      query.$or = [
        { title: { $regex: filters.search, $options: 'i' } },
        { content: { $regex: filters.search, $options: 'i' } },
      ];
    }
    
    const skip = (page - 1) * limit;
    const sortOptions: any = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
    
    const [items, total] = await Promise.all([
      Reflection.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .populate('linkedGoals')
        .populate('linkedContent'),
      Reflection.countDocuments(query),
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
    const reflection = await Reflection.findOne({ _id: id, userId })
      .populate('linkedGoals')
      .populate('linkedContent');
      
    if (!reflection) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Reflection not found');
    }
    
    return reflection;
  }

  async update(id: string, userId: string, data: any) {
    const reflection = await Reflection.findOneAndUpdate(
      { _id: id, userId },
      data,
      { new: true, runValidators: true }
    );
    
    if (!reflection) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Reflection not found');
    }
    
    return reflection;
  }

  async delete(id: string, userId: string) {
    const reflection = await Reflection.findOneAndDelete({ _id: id, userId });
    
    if (!reflection) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Reflection not found');
    }
    
    return reflection;
  }

  async addInsight(id: string, userId: string, insight: string) {
    const reflection = await Reflection.findOne({ _id: id, userId });
    
    if (!reflection) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Reflection not found');
    }
    
    reflection.insights.push(insight);
    await reflection.save();
    
    return reflection;
  }

  async linkGoal(id: string, userId: string, goalId: string) {
    const reflection = await Reflection.findOne({ _id: id, userId });
    
    if (!reflection) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Reflection not found');
    }
    
    if (!reflection.linkedGoals.includes(goalId as any)) {
      reflection.linkedGoals.push(goalId as any);
      await reflection.save();
    }
    
    return reflection;
  }

  async linkContent(id: string, userId: string, contentId: string) {
    const reflection = await Reflection.findOne({ _id: id, userId });
    
    if (!reflection) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Reflection not found');
    }
    
    if (!reflection.linkedContent.includes(contentId as any)) {
      reflection.linkedContent.push(contentId as any);
      await reflection.save();
    }
    
    return reflection;
  }

  async getByDateRange(userId: string, startDate: Date, endDate: Date) {
    const reflections = await Reflection.find({
      userId,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }).sort({ date: -1 });
    
    return reflections;
  }

  async getByMood(userId: string, mood: string, pagination: PaginationParams) {
    return this.getAll(userId, { mood }, pagination);
  }

  async getByTags(userId: string, tags: string[], pagination: PaginationParams) {
    return this.getAll(userId, { tags }, pagination);
  }
}

export const reflectionService = new ReflectionService();
