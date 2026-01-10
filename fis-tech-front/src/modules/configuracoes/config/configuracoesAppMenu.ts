import { IAppMenu } from "../../../typings/ModulesTypings";
import { HeaderSvgs } from "../../../utils/svg/headerSvgs";

export const configuracoesMenuItemList: IAppMenu[] = [
  {
    path: "/configuracoes",
    name: "Configurações",
    icon: HeaderSvgs["settingsOutlined"],
    permissionRequired: false,
  },
];
