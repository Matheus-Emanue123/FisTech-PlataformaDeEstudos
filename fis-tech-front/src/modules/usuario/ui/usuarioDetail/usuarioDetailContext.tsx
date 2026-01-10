import { createContext } from "react";
import { UsuarioSch } from "../../api/UsuarioSch";
import { PageState } from "../../../../typings/ScreenTypes";

interface IUsuarioDetailContext {
  pageType: PageState;
  usuarioDoc?: UsuarioSch;

  onSubmit: (obj: UsuarioSch) => void;
  closeModal: () => void;
  setPageType: (type: PageState) => void;
}

const UsuarioDetailContext = createContext<IUsuarioDetailContext>(
  {} as IUsuarioDetailContext
);
export default UsuarioDetailContext;
export type { IUsuarioDetailContext };
