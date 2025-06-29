import * as userModel from '../models/user.model';
import { validateData } from '../utils/validation';
import { BusinessLogicError, NotFoundError, ErrorCode } from '../utils/errors';
import { hashPassword } from 'jwt.security/jwt.passwordProvider';



export const createUser = async (userData: unknown) => {
  try {
    const validatedData = validateData(userModel.UserDataSchema, userData);
    
    const existingUser = await userModel.getUserByEmail(validatedData.email);
    if (existingUser) {
      throw new BusinessLogicError(
        'User with this email already exists',
        ErrorCode.EMAIL_ALREADY_EXISTS
      );
    }

    const hashedPassword = await hashPassword(validatedData.senha_hash);
    validatedData.senha_hash = hashedPassword;

    return userModel.createUser(validatedData);
  } catch (error) {
    if (error instanceof BusinessLogicError || error instanceof NotFoundError) {
      throw error;
    }
    throw new BusinessLogicError(
      'Failed to create user',
      ErrorCode.INVALID_OPERATION
    );
  }
};


export const updateUser = async (id: number, userData: unknown) => {
  try {
    const validatedId = validateData(userModel.UserIdSchema, { id });
    const validatedData = validateData(userModel.UserUpdateSchema, userData);
    
    const existingUser = await userModel.getUserById(validatedId.id);
    if (!existingUser) {
      throw new NotFoundError('User not found', ErrorCode.USER_NOT_FOUND);
    }

    if (validatedData.email && validatedData.email !== existingUser.email) {
      const userWithEmail = await userModel.getUserByEmail(validatedData.email);
      if (userWithEmail) {
        throw new BusinessLogicError('Email already in use', ErrorCode.EMAIL_ALREADY_EXISTS);
      }
    }

    return userModel.updateUser(validatedId.id, validatedData);
  } catch (error) {
    if (error instanceof BusinessLogicError || error instanceof NotFoundError) {
      throw error;
    }
    throw new BusinessLogicError(
      'Failed to update user',
      ErrorCode.INVALID_OPERATION
    );
  }
};

export const getUserById = async (id: number) => {
  try {
    const validatedId = validateData(userModel.UserIdSchema, { id });
    const user = await userModel.getUserById(validatedId.id);
    
    if (!user) {
      throw new NotFoundError('User not found', ErrorCode.USER_NOT_FOUND);
    }
    
    return user;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new BusinessLogicError(
      'Failed to retrieve user',
      ErrorCode.INVALID_OPERATION
    );
  }
};

export const deleteUser = async (id: number) => {
  try {
    const validatedId = validateData(userModel.UserIdSchema, { id });
    
    const existingUser = await userModel.getUserById(validatedId.id);
    if (!existingUser) {
      throw new NotFoundError('User not found', ErrorCode.USER_NOT_FOUND);
    }

    return userModel.deleteUser(validatedId.id);
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new BusinessLogicError(
      'Failed to delete user',
      ErrorCode.INVALID_OPERATION
    );
  }
};

export const getAllUsers = async () => {
  try {
    return userModel.getUsers();
  } catch (error) {
    throw new BusinessLogicError(
      'Failed to retrieve users',
      ErrorCode.INVALID_OPERATION
    );
  }
};