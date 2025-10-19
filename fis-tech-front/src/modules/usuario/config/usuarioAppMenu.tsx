import { IAppMenu } from "../../../typings/ModulesTypings";
import { HeaderSvgs } from "../../../utils/svg/headerSvgs";

export const usuarioMenuItemList: IAppMenu[] = [
  {
    path: "/usuario",
    name: "Usuários",
    icon: HeaderSvgs["userOutlined"],
    permissionRequired: true,
  },
];
