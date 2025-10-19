import { IModuleHub } from "../../../typings/ModulesTypings";
import { usuarioRouterList } from "./usuarioRouters";
import { usuarioMenuItemList } from "./usuarioAppMenu";

const usuarioModule: IModuleHub = {
  pagesRouterList: usuarioRouterList,
  pagesMenuItemList: usuarioMenuItemList,
};

export default usuarioModule;
