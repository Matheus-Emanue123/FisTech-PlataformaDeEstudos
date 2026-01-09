import { IModuleHub } from "../typings/ModulesTypings";
import usuarioModule from "./usuario/config";
import atividadesModule from "./atividades/config";

const pages = [...usuarioModule.pagesRouterList, ...atividadesModule.pagesRouterList];

const menuItens = [...usuarioModule.pagesMenuItemList, ...atividadesModule.pagesMenuItemList];

const Modules: IModuleHub = {
  pagesMenuItemList: menuItens,
  pagesRouterList: pages,
};

export default Modules;
