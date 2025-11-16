import { IRoute } from "../../../typings/ModulesTypings";
import { Example } from "../ui/example/Example";
import { LoginPage } from "../ui/loginPage/LoginPage";
import { NotFoundPage } from "../ui/notFoundPage/NotFoundPage";
import { NotPermissionPage } from "../ui/notPermissionPage/NotPermissionPage";

export const pagesRouterList: IRoute[] = [
  {
    path: "/example",
    component: Example,
    isProtected: true,
    permissionRequired: false,
  },
  {
    path: "/signin",
    component: LoginPage,
    isProtected: false,
    permissionRequired: false,
  },
  {
    path: "/not-permission",
    component: NotPermissionPage,
    isProtected: false,
    permissionRequired: false,
  },
  {
    path: "/not-found",
    component: NotFoundPage,
    isProtected: false,
    permissionRequired: false,
  },
];
