import { IModuleHub } from "../../../typings/ModulesTypings";
import { perfilRouterList } from "./perfilRouters";
import { perfilMenuItemList } from "./perfilAppMenu";

const perfilModule: IModuleHub = {
  pagesRouterList: perfilRouterList,
  pagesMenuItemList: perfilMenuItemList,
};

export default perfilModule;
