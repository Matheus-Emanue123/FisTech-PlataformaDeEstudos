import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { JWT_SECRET, JWT_EXPIRATION, REFRESH_SECRET, REFRESH_EXPIRATION } from '../config/auth.config';

export interface JWTPayload {
  userId: number;
  email: string;
  userType: string;
  jti?: string; // JWT ID for refresh tokens
}

export const extractTokenFromHeader = (authHeader: string | undefined): string => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Authorization header must start with Bearer');
  }
  return authHeader.substring(7);
}; 

export const generateToken = (payload: JWTPayload, tokenType: 'access' | 'refresh' = 'access'): string => {
  const secret = tokenType === 'access' ? JWT_SECRET : REFRESH_SECRET;
  const expiresIn = tokenType === 'access' ? JWT_EXPIRATION : REFRESH_EXPIRATION;

  // Ensure jti for refresh tokens
  if (tokenType === 'refresh' && !payload.jti) {
    payload.jti = uuidv4(); 
  }

  return (jwt.sign as any)(payload, secret, { expiresIn });
};

export const verifyToken = (token: string): JWTPayload => {
  try {
    return (jwt.verify as any)(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    throw new Error('Invalid or expired access token');
  }
};

export const verifyRefreshToken = (token: string): JWTPayload => {
  try {
    return (jwt.verify as any)(token, REFRESH_SECRET) as JWTPayload;
  } catch (error) {
    throw new Error('Invalid or expired refresh token');
  }
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const hashRefreshToken = async (token: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(token, salt);
};

export const compareRefreshToken = async (token: string, hashedToken: string): Promise<boolean> => {
  return bcrypt.compare(token, hashedToken);
};
