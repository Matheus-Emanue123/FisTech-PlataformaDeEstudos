import { Request, Response, NextFunction } from 'express';
import { apiResponse } from '../utils/apiResponse';
import * as authService from '../services/auth.service';
import { asyncHandler } from '../utils/asyncHandler';
import { BusinessLogicError, ErrorCode } from '../utils/errors';

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const result = await authService.login(req.body);
  apiResponse(res, 200, result, 'Login successful');
});

export const register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const result = await authService.register(req.body);
  apiResponse(res, 201, result, 'User registered successfully');
});

export const refresh = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    throw new BusinessLogicError('Refresh token is required', ErrorCode.UNAUTHORIZED);
  }
  const result = await authService.refreshAccessToken(refreshToken);
  apiResponse(res, 200, result, 'Token refreshed successfully');
});

export const logout = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    throw new BusinessLogicError('Refresh token is required', ErrorCode.UNAUTHORIZED);
  }
  await authService.logout(refreshToken);
  apiResponse(res, 200, null, 'Logged out successfully');
});
