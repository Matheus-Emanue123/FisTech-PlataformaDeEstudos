import { IRoute } from "../../../typings/ModulesTypings";
import usuarioContainer from "../ui/usuarioContainer";
import { UserType } from "./EnumUserType";

export const usuarioRouterList: IRoute[] = [
  {
    path: "/usuario/:screenState/:usuarioId",
    component: usuarioContainer,
    permissionRequired: true,
    isProtected: true,
    level: UserType.ADMINISTRATOR,
  },
  {
    path: "/usuario/:screenState",
    component: usuarioContainer,
    permissionRequired: true,
    isProtected: true,
    level: UserType.ADMINISTRATOR,
  },
  {
    path: "/usuario",
    component: usuarioContainer,
    permissionRequired: true,
    isProtected: true,
    level: UserType.ADMINISTRATOR,
  },
];
