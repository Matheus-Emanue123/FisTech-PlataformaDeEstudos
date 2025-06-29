import * as userModel from '../models/user.model';
import { validateData } from '../utils/validation';
import { BusinessLogicError, NotFoundError, ValidationError, ErrorCode } from '../utils/errors';
import { hashPassword, comparePassword, generateToken } from '../utils/jwt.utils';
import { LoginSchema, RegisterSchema, LoginData, RegisterData } from '../DTO/auth.dto';

export const login = async (loginData: unknown) => {
  try {
    const validatedData = validateData(LoginSchema, loginData) as LoginData;
    
    const user = await userModel.getUserByEmail(validatedData.email);
    if (!user) {
      throw new NotFoundError('User not found', ErrorCode.USER_NOT_FOUND);
    }

    const isPasswordValid = await comparePassword(validatedData.password, user.senha_hash);
    if (!isPasswordValid) {
      throw new BusinessLogicError('Invalid credentials', ErrorCode.UNAUTHORIZED);
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      userType: user.UserType?.tipo
    });

    return {
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        userType: user.UserType?.tipo
      },
      token
    };
  } catch (error) {
    if (error instanceof BusinessLogicError || error instanceof NotFoundError || error instanceof ValidationError) {
      throw error;
    }
    throw new BusinessLogicError(
      'Failed to authenticate user',
      ErrorCode.INVALID_OPERATION
    );
  }
};

export const register = async (registerData: unknown) => {
  try {
    const validatedData = validateData(RegisterSchema, registerData) as RegisterData;
    
    const existingUser = await userModel.getUserByEmail(validatedData.email);
    if (existingUser) {
      throw new BusinessLogicError(
        'User with this email already exists',
        ErrorCode.EMAIL_ALREADY_EXISTS
      );
    }

    const hashedPassword = await hashPassword(validatedData.password);
    
    const user = await userModel.createUser({
      nome: validatedData.nome,
      email: validatedData.email,
      senha_hash: hashedPassword,
      user_type_id: validatedData.user_type_id,
    });

    const token = generateToken({
      userId: user.id,
      email: user.email,
      userType: user.UserType?.tipo
    });

    return {
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        userType: user.UserType?.tipo
      },
      token
    };
  } catch (error) {
    if (error instanceof BusinessLogicError || error instanceof NotFoundError || error instanceof ValidationError) {
      throw error;
    }
    throw new BusinessLogicError(
      'Failed to register user',
      ErrorCode.INVALID_OPERATION
    );
  }
}; 