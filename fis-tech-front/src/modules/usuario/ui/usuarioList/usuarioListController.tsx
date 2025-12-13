import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material";
import { toUserType, UserType } from "../../config/EnumUserType";
import { PageState } from "../../../../typings/ScreenTypes";
import Context, { IUsuarioListContext } from "./usuarioListContext";
import UseAuthContext from "../../../../utils/hooks/useAuth/UseAuthContext";
import SysAppContext from "../../../../app/AppContext";
import UsuarioLisView from "./usuarioListView";
import { usuarioApi } from "../../api/UsuarioApi";
import { UsuarioSch } from "../../api/UsuarioSch";

var debounce = require("lodash.debounce");

interface IUsuarioListFilters {
  name: string | null;
  roles: UserType | null;
  disabled: boolean | null;
}

const UsuarioListController: React.FC = () => {
  const { showDialog, showNotification, showLoading } =
    useContext(SysAppContext);
  const { page, sort, limit, name, roles, disabled } = useParams();
  const [usuarioList, setUsuarioList] = useState<Array<UsuarioSch>>([]);
  const [currentPage, setcurrentPage] = useState<number>(Number(page) || 0);
  const [itensPerPage, setItensPerPage] = useState<number>(Number(limit) || 10);
  const [sorts, setSorts] = useState<Array<string>>(["createdAt.DESC"]);
  const [filters, setFilters] = useState<IUsuarioListFilters>({
    name: name ?? null,
    roles: toUserType(roles ?? "") ?? null,
    disabled: disabled === "true" ? true : false,
  });

  const parametrosDePesquisa = {
    ...filters,
    page: currentPage,
    sort: sorts,
    limit: itensPerPage,
  };

  useEffect(() => {
    showLoading(true);
    usuarioApi.listar(undefined, 0, 10, (error, data) => {
      if (error) {
        console.error("Erro ao buscar usuários:", error);
        showNotification({
          open: true,
          type: "error",
          duration: 6000,
          message: error,
        });
        return;
      }
      setUsuarioList(data || []);
      showLoading(false);
    });
  }, []);

  // const theme = useTheme();

  //   const disableUser = useCallback((id: string) => {
  //     userApi
  //       .desabilitarUsuario(id, "Usuário desabilitado com sucesso!")
  //       .then(() =>
  //         showNotification({
  //           type: "success",
  //           open: true,
  //           duration: 6000,
  //           message: "Usuário desabilitado com sucesso!",
  //         })
  //       )
  //       .catch((e) =>
  //         showNotification({
  //           open: true,
  //           duration: 6000,
  //           type: "error",
  //           message: e.message,
  //         })
  //       )
  //       .finally(() => callReload());
  //   }, []);

  //   const enableUser = useCallback((id?: string) => {
  //     userApi
  //       .habilitarUsuario(id, "Usuário habilitado com sucesso!")
  //       .then(() =>
  //         showNotification({
  //           type: "success",
  //           open: true,
  //           duration: 6000,
  //           message: "Usuário habilitado com sucesso!",
  //         })
  //       )
  //       .catch((e) =>
  //         showNotification({
  //           type: "error",
  //           open: true,
  //           duration: 6000,
  //           message: e.message,
  //         })
  //       )
  //       .finally(() => callReload());
  //   }, []);

  const handleSetSearchByText = useCallback(
    debounce((value?: string) => {
      setFilters((prev) => ({ ...prev, name: value ?? null }));
      setcurrentPage(1);
    }, 500),
    []
  );

  const handleSetSearchByProfile = useCallback((value?: UserType) => {
    setFilters((prev) => ({ ...prev, roles: value ?? null }));
    setcurrentPage(1);
  }, []);

  const handleSetShowDisabled = useCallback((value?: boolean) => {
    setFilters((prev) => ({ ...prev, disabled: value ?? false }));
  }, []);

  const providerValues: IUsuarioListContext = {
    usuarioList: usuarioList,
    //loading: loading,
    setSearchByText: handleSetSearchByText,
    currentPage: currentPage,
    //totalItens: result?.meta.totalItems ?? 0,
    itensPerPage: itensPerPage,
    setSearchByProfile: handleSetSearchByProfile,
    setShowDisabled: handleSetShowDisabled,
    // disableUser: disableUser,
    // enableUser: enableUser,
    setSort: setSorts,
    setItensPerPage: setItensPerPage,
    setPagination: setcurrentPage,
  };

  return (
    <Context.Provider value={providerValues}>
      <UsuarioLisView />
    </Context.Provider>
  );
};

export default UsuarioListController;
