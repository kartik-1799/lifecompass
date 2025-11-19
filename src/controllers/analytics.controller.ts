import { Response } from 'express';
import { AuthRequest } from '../types';
import { analyticsService } from '../analytics/analytics.service';
import { asyncHandler } from '../middlewares/error.middleware';

export const getUserAnalytics = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const analytics = await analyticsService.getUserAnalytics(userId);
  res.json({ success: true, data: analytics });
});

export const getSystemAnalytics = asyncHandler(async (req: AuthRequest, res: Response) => {
  const analytics = await analyticsService.getSystemAnalytics();
  res.json({ success: true, data: analytics });
});
