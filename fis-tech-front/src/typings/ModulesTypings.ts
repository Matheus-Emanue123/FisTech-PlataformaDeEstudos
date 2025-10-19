import { UserType } from "../modules/usuario/config/EnumUserType";

interface IAppMenu {
  name: string;
  icon: string[];
  path: string;
  permissionRequired: boolean;
}

interface IRoute {
  path: string;
  component:
    | React.ReactNode
    | React.Component
    | React.FunctionComponent<any>
    | React.ComponentType<any>;
  permissionRequired: boolean;
  isProtected: boolean;
  level?: UserType;
}

interface IModuleHub {
  pagesRouterList: IRoute[];
  pagesMenuItemList: IAppMenu[];
}

export type { IAppMenu, IRoute, IModuleHub };
