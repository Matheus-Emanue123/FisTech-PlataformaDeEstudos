import * as userModel from '../models/user.model';
import { validateData } from '../utils/validation';
import { BusinessLogicError, NotFoundError, ErrorCode } from '../utils/errors';
import { hashPassword } from '../utils/jwt.utils';
import { UserCreateSchema, UserUpdateSchema, UserIdSchema, UserQuery } from '../DTO/user.dto';

export const createUser = async (userData: unknown) => {
  const validatedData = validateData(UserCreateSchema, userData);
  const existingUser = await userModel.getUserByEmail(validatedData.email);

  if (existingUser) {
    throw new BusinessLogicError(
      'User with this email already exists',
      ErrorCode.EMAIL_ALREADY_EXISTS
    );
  }

  // Hash the password before passing to model
  const hashedPassword = await hashPassword(validatedData.senha_hash);

  return userModel.createUser({
    ...validatedData,
    senha_hash: hashedPassword
  });
};

export const updateUser = async (id: number, userData: unknown) => {
  const validatedId = validateData(UserIdSchema, { id });
  const validatedData = validateData(UserUpdateSchema, userData);
  
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

  // Hash password if provided
  let userDataToUpdate = { ...validatedData };
  
  if (validatedData.senha_hash) {
    const hashedPassword = await hashPassword(validatedData.senha_hash);
    userDataToUpdate = {
      ...validatedData,
      senha_hash: hashedPassword
    };
  }

  return userModel.updateUser(validatedId.id, userDataToUpdate);
};

export const getUserById = async (id: number) => {
  const validatedId = validateData(UserIdSchema, { id });
  const user = await userModel.getUserById(validatedId.id);
  
  if (!user) {
    throw new NotFoundError('User not found', ErrorCode.USER_NOT_FOUND);
  }
  
  if (user.disabled) {
    return { ...user, nome: 'Deleted User', email: 'deleted@example.com' };
  }

  return user;
};

export const deleteUser = async (id: number) => {
  const validatedId = validateData(UserIdSchema, { id });
  
  return userModel.updateUser(validatedId.id, { disabled: true });
};

export const getAllUsers = async (queryParams: UserQuery) => {
  const { page = 1, size = 10, sortBy = 'createdAt', direction = 'asc', nome, userType } = queryParams;

  const { users, total } = await userModel.getUsers({
    page,
    size,
    sortBy,
    direction,
    nome,
    userType,
  });

  const totalPages = Math.ceil(total / size);

  const formattedUsers = users.map((user: any) => {
    if (user.disabled) {
      return { ...user, nome: 'Deleted User', email: 'deleted@example.com' };
    }
    return user;
  });

  return {
    users: formattedUsers,
    total,
    page,
    size,
    totalPages,
  };
};
