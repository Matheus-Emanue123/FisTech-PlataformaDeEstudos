import { IRoute } from "../../../typings/ModulesTypings";
import ConquistasContainer from "../ui/ConquistasContainer";

export const conquistasRouterList: IRoute[] = [
  {
    path: "/conquistas",
    component: ConquistasContainer,
    permissionRequired: false,
    isProtected: false,
  },
];
