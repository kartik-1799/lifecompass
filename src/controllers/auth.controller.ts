import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { asyncHandler } from '../middlewares/error.middleware';
import { sendSuccess } from '../utils/response.util';
import { HTTP_STATUS, SUCCESS_MESSAGES } from '../config/constants';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;

  const result = await authService.register(email, password, firstName, lastName);

  sendSuccess(
    res,
    result,
    'User registered successfully',
    HTTP_STATUS.CREATED
  );
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await authService.login(email, password);

  sendSuccess(res, result, 'Login successful');
});

export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  const result = await authService.refreshToken(refreshToken);

  sendSuccess(res, result, 'Token refreshed successfully');
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  sendSuccess(res, null, 'Logout successful');
});
