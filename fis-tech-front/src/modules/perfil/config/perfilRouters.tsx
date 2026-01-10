import { IRoute } from "../../../typings/ModulesTypings";
import PerfilContainer from "../ui/PerfilContainer";

export const perfilRouterList: IRoute[] = [
  {
    path: "/meu-perfil",
    component: PerfilContainer,
    permissionRequired: false,
    isProtected: false,
  },
];
