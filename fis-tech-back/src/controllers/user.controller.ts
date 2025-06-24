import { Request, Response } from 'express';
import * as userService from '../services/user.service';
import { apiResponse } from '../utils/apiResponse';
import { AppError } from '../middlewares/errorHandler';

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    apiResponse(res, 201, user, 'User created successfully');
  } 
  catch (error: unknown) {
    if (error instanceof Error) {
      throw new AppError(400, error.message);
    }
    throw new AppError(400, 'Unknown error while creating user');
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    apiResponse(res, 200, users, 'Users retrieved successfully');

  } 
  catch (error: unknown) {
    if (error instanceof Error) {
      throw new AppError(500, error.message);
    }
    throw new AppError(500, 'Unknown error while retrieving users');
  }
};
