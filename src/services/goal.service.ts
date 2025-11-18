import { Goal } from '../models/Goal.model';
import { AppError } from '../middlewares/error.middleware';
import { HTTP_STATUS, ERROR_MESSAGES } from '../config/constants';
import { PaginationParams } from '../types';

export class GoalService {
  async create(userId: string, data: any) {
    const goal = await Goal.create({
      ...data,
      userId,
    });
    return goal;
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
    
    if (filters.priority) {
      query.priority = filters.priority;
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
      Goal.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .populate('linkedLearningPaths'),
      Goal.countDocuments(query),
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
    const goal = await Goal.findOne({ _id: id, userId })
      .populate('linkedLearningPaths');
      
    if (!goal) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Goal not found');
    }
    
    return goal;
  }

  async update(id: string, userId: string, data: any) {
    const goal = await Goal.findOneAndUpdate(
      { _id: id, userId },
      data,
      { new: true, runValidators: true }
    );
    
    if (!goal) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Goal not found');
    }
    
    return goal;
  }

  async delete(id: string, userId: string) {
    const goal = await Goal.findOneAndDelete({ _id: id, userId });
    
    if (!goal) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Goal not found');
    }
    
    return goal;
  }

  async addMilestone(id: string, userId: string, milestone: any) {
    const goal = await Goal.findOne({ _id: id, userId });
    
    if (!goal) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Goal not found');
    }
    
    goal.milestones.push(milestone);
    await goal.save();
    
    return goal;
  }

  async updateMilestone(id: string, userId: string, milestoneId: string, data: any) {
    const goal = await Goal.findOne({ _id: id, userId });
    
    if (!goal) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Goal not found');
    }
    
    const milestone = goal.milestones.id(milestoneId);
    
    if (!milestone) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Milestone not found');
    }
    
    Object.assign(milestone, data);
    
    // Calculate progress
    const completedMilestones = goal.milestones.filter((m) => m.completed).length;
    goal.progress = (completedMilestones / goal.milestones.length) * 100;
    
    // Update status if all milestones completed
    if (goal.progress === 100) {
      goal.status = 'completed';
    }
    
    await goal.save();
    
    return goal;
  }

  async completeMilestone(id: string, userId: string, milestoneId: string) {
    return this.updateMilestone(id, userId, milestoneId, {
      completed: true,
      completedAt: new Date(),
    });
  }

  async addNote(id: string, userId: string, note: string) {
    const goal = await Goal.findOne({ _id: id, userId });
    
    if (!goal) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Goal not found');
    }
    
    goal.notes.push(note);
    await goal.save();
    
    return goal;
  }

  async linkLearningPath(id: string, userId: string, learningPathId: string) {
    const goal = await Goal.findOne({ _id: id, userId });
    
    if (!goal) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Goal not found');
    }
    
    if (!goal.linkedLearningPaths.includes(learningPathId as any)) {
      goal.linkedLearningPaths.push(learningPathId as any);
      await goal.save();
    }
    
    return goal;
  }
}

export const goalService = new GoalService();
