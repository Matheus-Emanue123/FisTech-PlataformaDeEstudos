import { IAppMenu } from "../../../typings/ModulesTypings";
import { HeaderSvgs } from "../../../utils/svg/headerSvgs";

export const conquistasMenuItemList: IAppMenu[] = [
  {
    path: "/conquistas",
    name: "Conquistas",
    icon: HeaderSvgs["trophyOutlined"],
    permissionRequired: false,
  },
];
