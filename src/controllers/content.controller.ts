import { Response } from 'express';
import { AuthRequest } from '../types';
import { contentService } from '../services/content.service';
import { asyncHandler } from '../middlewares/error.middleware';
import { sendSuccess, sendPaginated } from '../utils/response.util';
import { HTTP_STATUS, SUCCESS_MESSAGES } from '../config/constants';

export const create = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const data = req.body;
  
  const content = await contentService.create(userId, data);
  
  sendSuccess(res, content, SUCCESS_MESSAGES.CREATED, HTTP_STATUS.CREATED);
});

export const getAll = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { type, category, difficulty, tags, search, page, limit, sortBy, sortOrder } = req.query;
  
  const filters = {
    type,
    category,
    difficulty,
    tags: tags ? (tags as string).split(',') : undefined,
    search,
  };
  
  const pagination = {
    page: Number(page) || 1,
    limit: Number(limit) || 10,
    sortBy: sortBy as string,
    sortOrder: sortOrder as 'asc' | 'desc',
  };
  
  const result = await contentService.getAll(filters, pagination);
  
  sendPaginated(res, result.items, result.page, result.limit, result.total, SUCCESS_MESSAGES.RETRIEVED);
});

export const getById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  
  const content = await contentService.getById(id);
  
  sendSuccess(res, content, SUCCESS_MESSAGES.RETRIEVED);
});

export const update = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;
  const data = req.body;
  
  const content = await contentService.update(id, userId, data);
  
  sendSuccess(res, content, SUCCESS_MESSAGES.UPDATED);
});

export const remove = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;
  
  await contentService.delete(id, userId);
  
  sendSuccess(res, null, SUCCESS_MESSAGES.DELETED);
});

export const like = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  
  const content = await contentService.incrementLike(id);
  
  sendSuccess(res, content, 'Content liked successfully');
});

export const complete = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  
  const content = await contentService.incrementCompletion(id);
  
  sendSuccess(res, content, 'Content marked as complete');
});

export const getByCategory = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { category } = req.params;
  const { page, limit, sortBy, sortOrder } = req.query;
  
  const pagination = {
    page: Number(page) || 1,
    limit: Number(limit) || 10,
    sortBy: sortBy as string,
    sortOrder: sortOrder as 'asc' | 'desc',
  };
  
  const result = await contentService.getByCategory(category, pagination);
  
  sendPaginated(res, result.items, result.page, result.limit, result.total, SUCCESS_MESSAGES.RETRIEVED);
});

export const getByType = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { type } = req.params;
  const { page, limit, sortBy, sortOrder } = req.query;
  
  const pagination = {
    page: Number(page) || 1,
    limit: Number(limit) || 10,
    sortBy: sortBy as string,
    sortOrder: sortOrder as 'asc' | 'desc',
  };
  
  const result = await contentService.getByType(type, pagination);
  
  sendPaginated(res, result.items, result.page, result.limit, result.total, SUCCESS_MESSAGES.RETRIEVED);
});
