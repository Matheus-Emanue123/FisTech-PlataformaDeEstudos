import { IAppMenu } from "../../../typings/ModulesTypings";
import { HeaderSvgs } from "../../../utils/svg/headerSvgs";

export const perfilMenuItemList: IAppMenu[] = [
  {
    path: "/meu-perfil",
    name: "Meu Perfil",
    icon: HeaderSvgs["userProfileOutlined"],
    permissionRequired: false,
  },
];
