import axios from "axios";
import { useMemo } from "react";
// import { UserType } from "../../../modules/user/config/EnumUserType";
import { BACKEND_URL } from "../../../typings/ConfigEnvironment";
import { UsuarioSch } from "../../../modules/usuario/api/UsuarioSch";

const api = axios.create({
  baseURL: BACKEND_URL,
});

export type LoginResponse = {
  user: UsuarioSch;
  acessToken: string;
  refreshToken: string;
};

export const useAuthServerApi = () =>
  useMemo(
    () => ({
      validadeToken: async (token: string) => {
        return { user: null }
      },
      login: async (email: string, password: string) : Promise<LoginResponse> => {
        console.log(email, password);
        console.log("Backend URL:", BACKEND_URL);
       const response = await api.post("/auth/login", { email, password });
          const { data } = response.data;
          console.log("Login response data:", data);
          return {
            user: data.user,
            acessToken: data.accessToken,
            refreshToken: data.refreshToken,
          };
      },
      logout: async () => {
        return { status: true };
      },
    }),
    []
  );
