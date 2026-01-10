import { IModuleHub } from "../../../typings/ModulesTypings";
import { conquistasRouterList } from "./conquistasRouters";
import { conquistasMenuItemList } from "./conquistasAppMenu";

const conquistasModule: IModuleHub = {
  pagesRouterList: conquistasRouterList,
  pagesMenuItemList: conquistasMenuItemList,
};

export default conquistasModule;
