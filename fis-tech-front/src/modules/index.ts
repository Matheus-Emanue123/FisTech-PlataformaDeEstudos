import { IModuleHub } from "../typings/ModulesTypings";
import usuarioModule from "./usuario/config";
import atividadesModule from "./atividades/config";
import perfilModule from "./perfil/config";
import conquistasModule from "./conquistas/config";
import configuracoesModule from "./configuracoes/config";

const pages = [
  ...usuarioModule.pagesRouterList, 
  ...atividadesModule.pagesRouterList,
  ...perfilModule.pagesRouterList,
  ...conquistasModule.pagesRouterList,
  ...configuracoesModule.pagesRouterList
];

const menuItens = [
  ...usuarioModule.pagesMenuItemList, 
  ...atividadesModule.pagesMenuItemList,
  ...perfilModule.pagesMenuItemList,
  ...conquistasModule.pagesMenuItemList,
  ...configuracoesModule.pagesMenuItemList
];

const Modules: IModuleHub = {
  pagesMenuItemList: menuItens,
  pagesRouterList: pages,
};

export default Modules;
