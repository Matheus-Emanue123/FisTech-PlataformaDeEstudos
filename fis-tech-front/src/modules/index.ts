import { IModuleHub } from "../typings/ModulesTypings";
import usuarioModule from "./usuario/config";

const pages = [...usuarioModule.pagesRouterList];

const menuItens = [...usuarioModule.pagesMenuItemList];

const Modules: IModuleHub = {
  pagesMenuItemList: menuItens,
  pagesRouterList: pages,
};

export default Modules;
