import { IModuleHub } from "../../../typings/ModulesTypings";
import { pagesRouterList } from "./pagesRouters";
import { pagesMenuItemList } from "./pagesAppMenu";

const usuarioModule: IModuleHub = {
  pagesRouterList: pagesRouterList,
  pagesMenuItemList: pagesMenuItemList,
};

export default usuarioModule;
