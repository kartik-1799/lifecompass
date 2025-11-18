import { Response } from 'express';
import { AuthRequest } from '../types';
import { reflectionService } from '../services/reflection.service';
import { asyncHandler } from '../middlewares/error.middleware';
import { sendSuccess, sendPaginated } from '../utils/response.util';
import { HTTP_STATUS, SUCCESS_MESSAGES } from '../config/constants';

export const create = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const data = req.body;
  
  const reflection = await reflectionService.create(userId, data);
  
  sendSuccess(res, reflection, SUCCESS_MESSAGES.CREATED, HTTP_STATUS.CREATED);
});

export const getAll = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { mood, tags, startDate, endDate, search, page, limit, sortBy, sortOrder } = req.query;
  
  const filters = {
    mood,
    tags: tags ? (tags as string).split(',') : undefined,
    startDate,
    endDate,
    search,
  };
  
  const pagination = {
    page: Number(page) || 1,
    limit: Number(limit) || 10,
    sortBy: sortBy as string,
    sortOrder: sortOrder as 'asc' | 'desc',
  };
  
  const result = await reflectionService.getAll(userId, filters, pagination);
  
  sendPaginated(res, result.items, result.page, result.limit, result.total, SUCCESS_MESSAGES.RETRIEVED);
});

export const getById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;
  
  const reflection = await reflectionService.getById(id, userId);
  
  sendSuccess(res, reflection, SUCCESS_MESSAGES.RETRIEVED);
});

export const update = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;
  const data = req.body;
  
  const reflection = await reflectionService.update(id, userId, data);
  
  sendSuccess(res, reflection, SUCCESS_MESSAGES.UPDATED);
});

export const remove = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;
  
  await reflectionService.delete(id, userId);
  
  sendSuccess(res, null, SUCCESS_MESSAGES.DELETED);
});

export const addInsight = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;
  const { insight } = req.body;
  
  const reflection = await reflectionService.addInsight(id, userId, insight);
  
  sendSuccess(res, reflection, 'Insight added successfully');
});

export const linkGoal = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;
  const { goalId } = req.body;
  
  const reflection = await reflectionService.linkGoal(id, userId, goalId);
  
  sendSuccess(res, reflection, 'Goal linked successfully');
});

export const linkContent = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;
  const { contentId } = req.body;
  
  const reflection = await reflectionService.linkContent(id, userId, contentId);
  
  sendSuccess(res, reflection, 'Content linked successfully');
});

export const getByDateRange = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { startDate, endDate } = req.query;
  
  const reflections = await reflectionService.getByDateRange(
    userId,
    new Date(startDate as string),
    new Date(endDate as string)
  );
  
  sendSuccess(res, reflections, SUCCESS_MESSAGES.RETRIEVED);
});

export const getByMood = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { mood } = req.params;
  const { page, limit, sortBy, sortOrder } = req.query;
  
  const pagination = {
    page: Number(page) || 1,
    limit: Number(limit) || 10,
    sortBy: sortBy as string,
    sortOrder: sortOrder as 'asc' | 'desc',
  };
  
  const result = await reflectionService.getByMood(userId, mood, pagination);
  
  sendPaginated(res, result.items, result.page, result.limit, result.total, SUCCESS_MESSAGES.RETRIEVED);
});
