import { PrismaClient } from '../generated/prisma/client.js';

const prisma = new PrismaClient();

// Cache das permissões por tipo de usuário
const permissionsCache = new Map<string, any>();

// Interface para as permissões
export interface UserPermissions {
  canManageUsers: boolean;
  canManageContent: boolean;
  canManageComments: boolean;
  canViewAnalytics: boolean;
}

// Carregar permissões do banco de dados
export async function loadPermissionsFromDB() {
  try {
    const userTypes = await prisma.userType.findMany();
    
    userTypes.forEach(userType => {
      permissionsCache.set(userType.tipo, userType.permissoes);
    });
    
    console.log('Permissões carregadas do banco de dados');
  } catch (error) {
    console.error('Erro ao carregar permissões:', error);
  }
}

export function getUserPermissions(userType: string): UserPermissions | null {
  return permissionsCache.get(userType) || null;
}

// Verificar se um tipo de usuário tem uma permissão específica
export function hasPermission(userType: string, permission: keyof UserPermissions): boolean {
  const permissions = getUserPermissions(userType);
  return permissions ? permissions[permission] === true : false;
}

// Verificar múltiplas permissões (todas devem ser true)
export function hasAllPermissions(userType: string, permissions: (keyof UserPermissions)[]): boolean {
  return permissions.every(permission => hasPermission(userType, permission));
}

// Verificar múltiplas permissões (pelo menos uma deve ser true)
export function hasAnyPermission(userType: string, permissions: (keyof UserPermissions)[]): boolean {
  return permissions.some(permission => hasPermission(userType, permission));
}

export async function reloadPermissions() {
  permissionsCache.clear();
  await loadPermissionsFromDB();
} 