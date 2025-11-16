import React, { createContext } from "react";
import { UsuarioSch } from "../../api/UsuarioSch";
import { PageState } from "../../../../typings/ScreenTypes";
import { UserType } from "../../config/EnumUserType";

interface IUsuarioListContext {
  usuarioList: Array<UsuarioSch>;
  currentPage: number;
  itensPerPage: number;
  //totalItens: number;

  setSearchByText: (value?: string) => void;
  setSearchByProfile: (value?: UserType) => void;
  setShowDisabled: (value?: boolean) => void;
  // disableUsuario: (id: string) => void;
  // enableUsuario: (id: string) => void;
  setSort: (value: Array<string>) => void;
  setItensPerPage: (value: number) => void;
  setPagination: (value: number) => void;
}

const UsuarioListContext = createContext<IUsuarioListContext>(
  {} as IUsuarioListContext
);
export default UsuarioListContext;
export type { IUsuarioListContext };
