import { IModuleHub } from "../../../typings/ModulesTypings";
import { atividadesRouterList } from "./atividadesRouters";
import { atividadesMenuItemList } from "./atividadesAppMenu";

const atividadesModule: IModuleHub = {
  pagesRouterList: atividadesRouterList,
  pagesMenuItemList: atividadesMenuItemList,
};

export default atividadesModule;
