import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { apiResponse } from '../utils/apiResponse';

export const login = async (req: Request, res: Response) => {
  const result = await authService.login(req.body);
  apiResponse(res, 200, result, 'Login successful');
};

export const register = async (req: Request, res: Response) => {
  const result = await authService.register(req.body);
  apiResponse(res, 201, result, 'User registered successfully');
}; 