import React, { ReactNode, useEffect, useState } from "react";
import Context, { IUseAuthContext } from "./UseAuthContext";
import { UsuarioSch } from "../../../modules/usuario/api/UsuarioSch";
import { useAuthServerApi } from "./UseAuthServerApi";
import { UserType } from "../../../modules/user/config/EnumUserType";
import { ACCESS_LEVELS_USER } from "../../../modules/user/config/AccessLevelUser";

const UseAuthController: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UsuarioSch | null>(null);
  const authServerApi = useAuthServerApi();

  console.log("User state:", user);

  useEffect(() => {
    const validadeToken = async () => {
      const isThereToken = getToken();
      if (isThereToken) {
        const data = await authServerApi.validadeToken(isThereToken);
        if (data.user) {
          setUser(data.user);
        }
      }
    };
    validadeToken();
  }, [authServerApi]);

  const signIn = async (email: string, password: string) => {
    const data = await authServerApi.login(email, password);
    console.log("Login response data:", data);
    if (data.user && data.acessToken) {
      setUser(data.user);
      console.log("User state:", user);
      setToken(data.acessToken);
      return true;
    }
    return false;
  };

  const signOut = async () => {
    await authServerApi.logout();
    setUser(null);
    sessionStorage.removeItem("authToken");
  };

  const getToken = (): string | null => {
    return sessionStorage.getItem("authToken");
  };

  const setToken = (token: string) => {
    sessionStorage.setItem("authToken", token);
  };

  const hasPermission = (requiredLevel: UserType): boolean => {
    if (!user) return false;

    const userLevel = ACCESS_LEVELS_USER[user.userType];
    const required = ACCESS_LEVELS_USER[requiredLevel];

    return userLevel >= required;
  };

  const providerValues: IUseAuthContext = {
    user,
    isLogged: !!user,
    signIn,
    signOut,
    getToken,
    setToken,
    hasPermission,
  };

  return <Context.Provider value={providerValues}>{children}</Context.Provider>;
};

export default UseAuthController;
