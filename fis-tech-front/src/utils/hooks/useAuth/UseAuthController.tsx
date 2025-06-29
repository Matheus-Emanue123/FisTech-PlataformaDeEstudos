import React, { ReactNode, useState } from "react";
import Context, { IUseAuthContext } from "./UseAuthContext";
import { UserSch } from "../../../modules/user/config/UserSch";
import { useAuthServerApi } from "./UseAuthServerApi";

const UseAuthController: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSch | null>(null);
  const authServerApi = useAuthServerApi();

  const signIn = async (email: string, password: string) => {
    const data = await authServerApi.login(email, password);
    if (data.user && data.token) {
      setUser(data.user);
      return true;
    }
    return false;
  };

  const signOut = async () => {
    await authServerApi.logout();
    setUser(null);
  };

  const providerValues: IUseAuthContext = {
    user,
    isLogged: !!user,
    signIn,
    signOut,
  };

  return <Context.Provider value={providerValues}>{children}</Context.Provider>;
};

export default UseAuthController;
