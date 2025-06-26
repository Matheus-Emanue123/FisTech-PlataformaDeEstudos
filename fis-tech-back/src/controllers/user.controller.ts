import { Request, Response } from 'express';
import * as userService from '../services/user.service';
import { apiResponse } from '../utils/apiResponse';
import { NotFoundError } from '../utils/errors';

export const createUser = async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  apiResponse(res, 201, user, 'User created successfully');
};

export const getUserById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = await userService.getUserById(id);
  
  if (!user) {
    throw new NotFoundError('User not found');
  }
  
  apiResponse(res, 200, user, 'User retrieved successfully');
};

export const updateUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = await userService.updateUser(id, req.body);
  apiResponse(res, 200, user, 'User updated successfully');
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = await userService.deleteUser(id);
  apiResponse(res, 200, user, 'User deleted successfully');
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  apiResponse(res, 200, users, 'Users retrieved successfully');
};
