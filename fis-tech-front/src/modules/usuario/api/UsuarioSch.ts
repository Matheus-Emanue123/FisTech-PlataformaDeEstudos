import { UserType } from "../config/EnumUserType";

export interface UsuarioSch {
  id?: number;
  nome: string;
  email: string;
  userType: UserType;
}
