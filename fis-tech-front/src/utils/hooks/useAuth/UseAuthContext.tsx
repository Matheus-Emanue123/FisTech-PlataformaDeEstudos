import { createContext } from "react";
import { UserSch } from "../../../modules/user/config/UserSch";

interface IUseAuthContext {
  user: UserSch | null;
  isLogged: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
}

const UseAuthContext = createContext<IUseAuthContext>({} as IUseAuthContext);

export default UseAuthContext;

export type { IUseAuthContext };
