import { IModuleHub } from "../../../typings/ModulesTypings";
import { configuracoesRouterList } from "./configuracoesRouters";
import { configuracoesMenuItemList } from "./configuracoesAppMenu";

const configuracoesModule: IModuleHub = {
  pagesRouterList: configuracoesRouterList,
  pagesMenuItemList: configuracoesMenuItemList,
};

export default configuracoesModule;
