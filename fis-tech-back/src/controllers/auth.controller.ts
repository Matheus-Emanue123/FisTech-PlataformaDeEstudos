import { Request, Response, NextFunction } from 'express';
import { apiResponse } from '../utils/apiResponse';
import * as authService from '../services/auth.service';
import { asyncHandler } from '../utils/asyncHandler';

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const result = await authService.login(req.body);
  apiResponse(res, 200, result, 'Login successful');
});

export const register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const result = await authService.register(req.body);
  apiResponse(res, 201, result, 'User registered successfully');
}); 