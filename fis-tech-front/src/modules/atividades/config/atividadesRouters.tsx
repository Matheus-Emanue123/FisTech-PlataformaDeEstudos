import { IRoute } from "../../../typings/ModulesTypings";
import AtividadeContainer from "../ui/atividadeContainer";

export const atividadesRouterList: IRoute[] = [
  {
    path: "/atividades/:screenState/:atividadeId",
    component: AtividadeContainer,
    permissionRequired: false,
    isProtected: false,
  },
  {
    path: "/atividades/:screenState",
    component: AtividadeContainer,
    permissionRequired: false,
    isProtected: false,
  },
  {
    path: "/atividades",
    component: AtividadeContainer,
    permissionRequired: false,
    isProtected: false,
  },
];
