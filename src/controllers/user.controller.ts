import { Response } from 'express';
import { AuthRequest } from '../types';
import { userService } from '../services/user.service';
import { asyncHandler } from '../middlewares/error.middleware';
import { sendSuccess } from '../utils/response.util';
import { SUCCESS_MESSAGES } from '../config/constants';

export const getProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;

  const profile = await userService.getProfile(userId);

  sendSuccess(res, profile, SUCCESS_MESSAGES.RETRIEVED);
});

export const updateProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const data = req.body;

  const profile = await userService.updateProfile(userId, data);

  sendSuccess(res, profile, SUCCESS_MESSAGES.UPDATED);
});

export const updatePreferences = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const preferences = req.body;

  const updatedPreferences = await userService.updatePreferences(userId, preferences);

  sendSuccess(res, updatedPreferences, SUCCESS_MESSAGES.UPDATED);
});
