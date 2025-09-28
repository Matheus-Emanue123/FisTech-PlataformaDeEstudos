import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';
import { apiResponse } from '../utils/apiResponse';
import { validateId } from '../utils/validation';
import { asyncHandler } from '../utils/asyncHandler';

export const createUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user = await userService.createUser(req.body);
  apiResponse(res, 201, user, 'User created successfully');
});

export const getUserById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const id = validateId(req.params.id);
  const user = await userService.getUserById(id);
  apiResponse(res, 200, user, 'User retrieved successfully');
});

export const updateUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const id = validateId(req.params.id);
  const user = await userService.updateUser(id, req.body);
  apiResponse(res, 200, user, 'User updated successfully');
});

export const deleteUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const id = validateId(req.params.id);
  const user = await userService.deleteUser(id);
  apiResponse(res, 200, user, 'User deleted successfully');
});

export const getUsers = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const users = await userService.getAllUsers();
  apiResponse(res, 200, users, 'Users retrieved successfully');
});
