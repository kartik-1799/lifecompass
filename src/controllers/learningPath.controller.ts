import { Response } from 'express';
import { AuthRequest } from '../types';
import { learningPathService } from '../services/learningPath.service';
import { asyncHandler } from '../middlewares/error.middleware';
import { sendSuccess, sendPaginated } from '../utils/response.util';
import { HTTP_STATUS, SUCCESS_MESSAGES } from '../config/constants';

export const create = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const data = req.body;
  
  const learningPath = await learningPathService.create(userId, data);
  
  sendSuccess(res, learningPath, SUCCESS_MESSAGES.CREATED, HTTP_STATUS.CREATED);
});

export const getAll = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { status, category, search, page, limit, sortBy, sortOrder } = req.query;
  
  const filters = { status, category, search };
  const pagination = {
    page: Number(page) || 1,
    limit: Number(limit) || 10,
    sortBy: sortBy as string,
    sortOrder: sortOrder as 'asc' | 'desc',
  };
  
  const result = await learningPathService.getAll(userId, filters, pagination);
  
  sendPaginated(res, result.items, result.page, result.limit, result.total, SUCCESS_MESSAGES.RETRIEVED);
});

export const getById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;
  
  const learningPath = await learningPathService.getById(id, userId);
  
  sendSuccess(res, learningPath, SUCCESS_MESSAGES.RETRIEVED);
});

export const update = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;
  const data = req.body;
  
  const learningPath = await learningPathService.update(id, userId, data);
  
  sendSuccess(res, learningPath, SUCCESS_MESSAGES.UPDATED);
});

export const remove = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;
  
  await learningPathService.delete(id, userId);
  
  sendSuccess(res, null, SUCCESS_MESSAGES.DELETED);
});

export const updateProgress = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;
  const { contentId } = req.body;
  
  const learningPath = await learningPathService.updateProgress(id, userId, contentId);
  
  sendSuccess(res, learningPath, 'Progress updated successfully');
});

export const addContent = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;
  const { contentId, order } = req.body;
  
  const learningPath = await learningPathService.addContent(id, userId, contentId, order);
  
  sendSuccess(res, learningPath, 'Content added successfully');
});

export const removeContent = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { id, contentId } = req.params;
  
  const learningPath = await learningPathService.removeContent(id, userId, contentId);
  
  sendSuccess(res, learningPath, 'Content removed successfully');
});
