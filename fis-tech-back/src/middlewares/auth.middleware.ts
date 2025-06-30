import { Request, Response, NextFunction } from 'express';
import { verifyToken, extractTokenFromHeader } from '../utils/jwt.utils';
import { apiResponse } from '../utils/apiResponse';
import { hasPermission, UserPermissions } from '../utils/permissions';

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

// Permission-based authorization middleware (inclui ownership)
export const requirePermission = (permission: keyof UserPermissions) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return apiResponse(res, 401, null, 'Authentication required');
    }

    if (!req.user.userType) {
      return apiResponse(res, 403, null, 'User type not found');
    }

    // Verificar se tem permissão geral
    if (hasPermission(req.user.userType, permission)) {
      return next();
    }

    // Verificar se é dono do recurso (userId na URL deve ser igual ao userId do token)
    const resourceUserId = parseInt(req.params.userId || req.params.id);
    if (resourceUserId === req.user.userId) {
      return next();
    }

    return apiResponse(res, 403, null, `Access denied. Required permission: ${permission} or resource ownership`);
  };
};

// Convenience functions for specific permissions
export const requireManageUsers = requirePermission('canManageUsers');
export const requireManageContent = requirePermission('canManageContent');
export const requireManageComments = requirePermission('canManageComments');
export const requireViewAnalytics = requirePermission('canViewAnalytics');
