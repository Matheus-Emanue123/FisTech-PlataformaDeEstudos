import { PrismaClient } from '../generated/prisma';
import * as userModel from '../models/user.model';
import { validateData } from '../utils/validation';
import { BusinessLogicError, NotFoundError, ErrorCode } from '../utils/errors';
import { 
  hashPassword, 
  comparePassword, 
  generateToken, 
  hashRefreshToken, 
  verifyRefreshToken, 
  compareRefreshToken,
  JWTPayload
} from '../utils/jwt.utils';
import { LoginSchema, RegisterSchema, LoginData, RegisterData } from '../DTO/auth.dto';
import { REFRESH_EXPIRATION } from '../config/auth.config';

const prisma = new PrismaClient();

export const login = async (loginData: unknown) => {
  const validatedData = validateData(LoginSchema, loginData) as LoginData;
  
  const user = await userModel.getUserByEmail(validatedData.email);
  if (!user) {
    throw new NotFoundError('User not found', ErrorCode.USER_NOT_FOUND);
  }

  const isPasswordValid = await comparePassword(validatedData.password, user.senha_hash);
  if (!isPasswordValid) {
    throw new BusinessLogicError('Invalid credentials', ErrorCode.UNAUTHORIZED);
  }

  const { accessToken, refreshToken } = await _generateAuthTokens(user);

  return {
    user: {
      id: user.id,
      nome: user.nome,
      email: user.email,
      userType: user.UserType.tipo
    },
    accessToken,
    refreshToken
  };
};

const _generateAuthTokens = async (user: { id: number; email: string; UserType: { tipo: string; }; }) => {
  const accessToken = generateToken({
    userId: user.id,
    email: user.email,
    userType: user.UserType.tipo
  }, 'access');

  const refreshToken = generateToken({
    userId: user.id,
    email: user.email,
    userType: user.UserType.tipo
  }, 'refresh');

  const hashedRefreshToken = await hashRefreshToken(refreshToken);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + parseInt(REFRESH_EXPIRATION.replace('d', '')));

  await prisma.refreshToken.create({
    data: {
      token_hash: hashedRefreshToken,
      usuarioId: user.id,
      expiresAt: expiresAt,
    },
  });

  return { accessToken, refreshToken };
};

export const register = async (registerData: unknown) => {
  const validatedData = validateData(RegisterSchema, registerData) as RegisterData;
  
  const existingUser = await userModel.getUserByEmail(validatedData.email);
  if (existingUser) {
    throw new BusinessLogicError(
      'User with this email already exists',
      ErrorCode.EMAIL_ALREADY_EXISTS
    );
  }

  const hashedPassword = await hashPassword(validatedData.password);

  const defaultUserType = await prisma.userType.findUnique({
    where: { tipo: 'usuario_padrao' },
  });

  if (!defaultUserType) {
    throw new BusinessLogicError(
      'Default user type "usuario_padrao" not found. Please seed the database.',
      ErrorCode.INTERNAL_SERVER_ERROR
    );
  }
  
  const user = await userModel.createUser({
    nome: validatedData.nome,
    email: validatedData.email,
    senha_hash: hashedPassword,
    user_type_id: defaultUserType.id, // Assign the ID of the default user type
  });

  const { accessToken, refreshToken } = await _generateAuthTokens(user);

  return {
    user: {
      id: user.id,
      nome: user.nome,
      email: user.email,
      userType: user.UserType.tipo
    },
    accessToken,
    refreshToken
  };
};

export const refreshAccessToken = async (oldRefreshToken: string) => {
  let payload: JWTPayload;
  try {
    payload = verifyRefreshToken(oldRefreshToken);
  } catch (error: any) {
    throw new BusinessLogicError(error.message, ErrorCode.UNAUTHORIZED);
  }

  const storedRefreshToken = await prisma.refreshToken.findFirst({
    where: {
      usuarioId: payload.userId,
      expiresAt: { gt: new Date() },
      isRevoked: false,
    },
  });

  if (!storedRefreshToken) {
    throw new BusinessLogicError('Refresh token not found or expired', ErrorCode.UNAUTHORIZED);
  }

  const isTokenValid = await compareRefreshToken(oldRefreshToken, storedRefreshToken.token_hash);

  if (!isTokenValid) {
    // If an old refresh token is reused, assume compromise and revoke all sessions for this user
    await prisma.refreshToken.updateMany({
      where: { usuarioId: payload.userId },
      data: { isRevoked: true },
    });
    throw new BusinessLogicError('Refresh token reuse detected. All sessions revoked.', ErrorCode.UNAUTHORIZED);
  }

  // Invalidate the old refresh token
  await prisma.refreshToken.update({
    where: { id: storedRefreshToken.id },
    data: { isRevoked: true },
  });

  const newAccessToken = generateToken({
    userId: payload.userId,
    email: payload.email,
    userType: payload.userType
  }, 'access');

  const newRefreshToken = generateToken({
    userId: payload.userId,
    email: payload.email,
    userType: payload.userType
  }, 'refresh');

  const hashedNewRefreshToken = await hashRefreshToken(newRefreshToken);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + parseInt(REFRESH_EXPIRATION.replace('d', '')));

  await prisma.refreshToken.create({
    data: {
      token_hash: hashedNewRefreshToken,
      usuarioId: payload.userId,
      expiresAt: expiresAt,
    },
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

export const logout = async (refreshToken: string) => {
  let payload: JWTPayload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch (error: any) {
    throw new BusinessLogicError(error.message, ErrorCode.UNAUTHORIZED);
  }

  const storedRefreshToken = await prisma.refreshToken.findFirst({
    where: {
      usuarioId: payload.userId,
      expiresAt: { gt: new Date() },
      isRevoked: false,
    },
  });

  if (storedRefreshToken) {
    const isTokenValid = await compareRefreshToken(refreshToken, storedRefreshToken.token_hash);
    if (isTokenValid) {
      await prisma.refreshToken.update({
        where: { id: storedRefreshToken.id },
        data: { isRevoked: true },
      });
    }
  }
};
