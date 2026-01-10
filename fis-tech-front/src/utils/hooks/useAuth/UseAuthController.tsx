import React, { ReactNode, useState } from "react";
import Context, { IUseAuthContext } from "./UseAuthContext";
import { useAuthServerApi } from "./UseAuthServerApi";
import {
  ACCESS_LEVELS_USER,
  UserType,
} from "../../../modules/usuario/config/EnumUserType";
import { UsuarioSch } from "../../../modules/usuario/api/UsuarioSch";

const UseAuthController: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UsuarioSch | null>(null);
  const authServerApi = useAuthServerApi();

  const checkToken = async () => {
    try {
      const isThereToken = localStorage.getItem("refreshToken");
      if (isThereToken) {
        const data = await authServerApi.validateToken(isThereToken);
        if (data.user) {
          setUser(data.user);
        }
      }
    } catch (err: any) {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("authToken");
    }
  };

  const signIn = async (
    email: string,
    password: string,
    callback?: (error: string | null, resp: boolean) => void
  ) => {
    try {
      const data = await authServerApi.login(email, password);
      if (data.user && data.accessToken && data.refreshToken) {
        setUser(data.user);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("authToken", data.accessToken);
        console.log("Login efetuado com sucesso");
        callback?.(null, true);
      }
    } catch (error: any) {
      console.log(error);
      callback?.(
        error.response?.data?.error?.message || "Erro desconhecido",
        false
      );
    }
  };

  const register = async (
    nome: string,
    email: string,
    password: string,
    callback?: (error: string | null, resp: boolean) => void
  ) => {
    try {
      await authServerApi.registerUsuario(nome, email, password);
      console.log("Usuário registrado com sucesso");
      callback?.(null, true);
    } catch (error: any) {
      console.log(error);
      callback?.(
        error.response?.data?.error?.message || "Erro desconhecido",
        false
      );
    }
  };

  const signOut = async () => {
    const isThereToken = localStorage.getItem("refreshToken");
    if (isThereToken) {
      await authServerApi.logout(isThereToken);
      setUser(null);
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("authToken");
    }
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
    register,
    signOut,
    checkToken,
    hasPermission,
  };

  return <Context.Provider value={providerValues}>{children}</Context.Provider>;
};

export default UseAuthController;
