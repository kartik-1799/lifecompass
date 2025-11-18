import { Response } from 'express';
import { AuthRequest } from '../types';
import { goalService } from '../services/goal.service';
import { asyncHandler } from '../middlewares/error.middleware';
import { sendSuccess, sendPaginated } from '../utils/response.util';
import { HTTP_STATUS, SUCCESS_MESSAGES } from '../config/constants';

export const create = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const data = req.body;
  
  const goal = await goalService.create(userId, data);
  
  sendSuccess(res, goal, SUCCESS_MESSAGES.CREATED, HTTP_STATUS.CREATED);
});

export const getAll = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { status, category, priority, search, page, limit, sortBy, sortOrder } = req.query;
  
  const filters = { status, category, priority, search };
  const pagination = {
    page: Number(page) || 1,
    limit: Number(limit) || 10,
    sortBy: sortBy as string,
    sortOrder: sortOrder as 'asc' | 'desc',
  };
  
  const result = await goalService.getAll(userId, filters, pagination);
  
  sendPaginated(res, result.items, result.page, result.limit, result.total, SUCCESS_MESSAGES.RETRIEVED);
});

export const getById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;
  
  const goal = await goalService.getById(id, userId);
  
  sendSuccess(res, goal, SUCCESS_MESSAGES.RETRIEVED);
});

export const update = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;
  const data = req.body;
  
  const goal = await goalService.update(id, userId, data);
  
  sendSuccess(res, goal, SUCCESS_MESSAGES.UPDATED);
});

export const remove = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;
  
  await goalService.delete(id, userId);
  
  sendSuccess(res, null, SUCCESS_MESSAGES.DELETED);
});

export const addMilestone = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;
  const milestone = req.body;
  
  const goal = await goalService.addMilestone(id, userId, milestone);
  
  sendSuccess(res, goal, 'Milestone added successfully');
});

export const updateMilestone = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { id, milestoneId } = req.params;
  const data = req.body;
  
  const goal = await goalService.updateMilestone(id, userId, milestoneId, data);
  
  sendSuccess(res, goal, 'Milestone updated successfully');
});

export const completeMilestone = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { id, milestoneId } = req.params;
  
  const goal = await goalService.completeMilestone(id, userId, milestoneId);
  
  sendSuccess(res, goal, 'Milestone completed successfully');
});

export const addNote = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;
  const { note } = req.body;
  
  const goal = await goalService.addNote(id, userId, note);
  
  sendSuccess(res, goal, 'Note added successfully');
});

export const linkLearningPath = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;
  const { learningPathId } = req.body;
  
  const goal = await goalService.linkLearningPath(id, userId, learningPathId);
  
  sendSuccess(res, goal, 'Learning path linked successfully');
});
