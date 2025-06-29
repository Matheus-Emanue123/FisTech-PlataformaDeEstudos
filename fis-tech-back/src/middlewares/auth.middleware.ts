import { Request, Response, NextFunction } from 'express';
import { verifyToken, extractTokenFromHeader } from '../utils/jwt.utils';
import { apiResponse } from '../utils/apiResponse';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
    email: string;
    userType: string;
  };
}

// Base authentication middleware
export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return apiResponse(res, 401, null, 'Authorization header is required');
    }
    
    const token = extractTokenFromHeader(authHeader);
    const decoded = verifyToken(token);
    req.user = decoded;
    
    next();
  } catch (error) {
    return apiResponse(res, 401, null, 'Access token is invalid or expired');
  }
};

// Role-based authorization middleware
export const requireRole = (allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return apiResponse(res, 401, null, 'Authentication required');
    }

    if (!req.user.userType) {
      return apiResponse(res, 403, null, 'User type not found');
    }

    if (!allowedRoles.includes(req.user.userType)) {
      return apiResponse(res, 403, null, `Access denied. Required roles: ${allowedRoles.join(', ')}`);
    }

    next();
  };
};

// Convenience functions for specific roles
export const requireAdmin = requireRole(['administrador']);
export const requireModerator = requireRole(['moderador', 'administrador']);
export const requireUser = requireRole(['usuario_padrao', 'moderador', 'administrador']);
