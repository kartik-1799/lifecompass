import { Response } from 'express';
import { AuthRequest } from '../types';
import { searchService } from '../services/search.service';
import { asyncHandler } from '../middlewares/error.middleware';

export const search = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { q, type } = req.query;
  const results = await searchService.search(q as string, { type });
  res.json({ success: true, data: results });
});
