import { IRoute } from "../../../typings/ModulesTypings";
import ConfiguracoesContainer from "../ui/ConfiguracoesContainer";

export const configuracoesRouterList: IRoute[] = [
  {
    path: "/configuracoes",
    component: ConfiguracoesContainer,
    permissionRequired: false,
    isProtected: false,
  },
];
