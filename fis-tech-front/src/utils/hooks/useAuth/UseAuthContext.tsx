import { createContext } from "react";
import { UserType } from "../../../modules/usuario/config/EnumUserType";
import { UsuarioSch } from "../../../modules/usuario/api/UsuarioSch";

interface IUseAuthContext {
  user: UsuarioSch | null;
  isLogged: boolean;
  signIn: (
    email: string,
    password: string,
    callback: (error: any, resp: boolean) => void
  ) => Promise<void>;
  register: (
    nome: string,
    email: string,
    password: string,
    callback: (error: any, resp: boolean) => void
  ) => Promise<void>;
  signOut: () => void;
  checkToken: () => void;
  hasPermission: (requiredLevel: UserType) => boolean;
}

const UseAuthContext = createContext<IUseAuthContext>({} as IUseAuthContext);

export default UseAuthContext;

export type { IUseAuthContext };
