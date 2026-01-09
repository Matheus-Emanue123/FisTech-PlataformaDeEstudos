import { IModuleHub } from "../typings/ModulesTypings";
import usuarioModule from "./usuario/config";
import atividadesModule from "./atividades/config";
import perfilModule from "./perfil/config";

const pages = [
  ...usuarioModule.pagesRouterList, 
  ...atividadesModule.pagesRouterList,
  ...perfilModule.pagesRouterList
];

const menuItens = [
  ...usuarioModule.pagesMenuItemList, 
  ...atividadesModule.pagesMenuItemList,
  ...perfilModule.pagesMenuItemList
];

const Modules: IModuleHub = {
  pagesMenuItemList: menuItens,
  pagesRouterList: pages,
};

export default Modules;
