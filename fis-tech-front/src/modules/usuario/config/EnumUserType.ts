export enum UserType {
  ADMINISTRATOR = "administrador",
  MODERATOR = "moderador",
  NORMAL = "usuario_padrao",
}

export const ACCESS_LEVELS_USER = {
  [UserType.NORMAL]: 0,
  [UserType.MODERATOR]: 1,
  [UserType.ADMINISTRATOR]: 2,
};

export function toUserType(value: string): UserType | null {
  return Object.values(UserType).includes(value as UserType)
    ? (value as UserType)
    : null;
}
