import { IAppMenu } from "../../../typings/ModulesTypings";
import { HeaderSvgs } from "../../../utils/svg/headerSvgs";

export const pagesMenuItemList: IAppMenu[] = [
  {
    path: "/",
    name: "Exemplo",
    icon: HeaderSvgs["homeOutlined"],
    permissionRequired: false,
  },
];
