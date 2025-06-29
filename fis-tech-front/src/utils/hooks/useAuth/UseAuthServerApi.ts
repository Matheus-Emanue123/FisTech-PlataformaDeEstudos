import axios from "axios";
import { UserType } from "../../../modules/user/config/EnumUserType";

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export const useAuthServerApi = () => ({
  validadeToken: async (token: string) => {
    const response = await api.post("/validate", { token });
    return response.data;
  },
  login: async (email: string, password: string) => {
    return {
      user: {
        id: 1,
        name: "João da Silva",
        email: "joao.silva@email.com",
        password: "senhaSegura123",
        createdAt: new Date("2024-01-10T10:00:00Z"),
        lastAccess: new Date("2025-06-29T15:00:00Z"),
        typeUser: UserType.NORMAL,
      },
      token: "123456789",
    };
  },
  logout: async () => {
    const response = await api.post("/logout");
    return response.data;
  },
});
