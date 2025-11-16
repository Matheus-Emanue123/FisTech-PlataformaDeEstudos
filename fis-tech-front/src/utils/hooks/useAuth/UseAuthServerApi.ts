import axios from "axios";
import { useMemo } from "react";
import { BACKEND_URL } from "../../../typings/ConfigEnvironment";
import { UsuarioSch } from "../../../modules/usuario/api/UsuarioSch";

type LoginResponse = {
  user: UsuarioSch;
  accessToken: string;
  refreshToken: string;
};

const api = axios.create({
  baseURL: BACKEND_URL + "/auth",
});

function throwAxiosError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    const custom = {
      isAxiosError: true,
      message: error.response?.data?.error?.message || "Erro desconhecido",
      response: error.response,
    };
    throw custom;
  }
  throw error instanceof Error ? error : new Error("Erro desconhecido");
}

async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    const { data } = await api.post("/login", { email, password });
    const { user, accessToken, refreshToken } = data.data;
    return { user, accessToken, refreshToken };
  } catch (error) {
    throwAxiosError(error);
  }
}

async function registerUsuario(
  nome: string,
  email: string,
  password: string
): Promise<void> {
  try {
    const { data } = await api.post("/register", { email, password, nome });
    console.log("response = ", data.data);
  } catch (error) {
    throwAxiosError(error);
  }
}

async function validateToken(token: string): Promise<LoginResponse> {
  try {
    const { data } = await api.post("/refresh", { refreshToken: token });
    const { user, accessToken, refreshToken } = data.data;
    return { user, accessToken, refreshToken };
  } catch (error) {
    throwAxiosError(error);
  }
}

async function logout(refreshToken: string) {
  try {
    await api.post("/logout", { refreshToken });
  } catch (error) {
    throwAxiosError(error);
  }
}

export const useAuthServerApi = () =>
  useMemo(
    () => ({
      validateToken,
      login,
      registerUsuario,
      logout,
    }),
    []
  );
