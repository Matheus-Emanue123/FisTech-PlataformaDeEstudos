import { Box, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { NotFoundPage } from "../../../ui/sysPages/ui/notFoundPage/NotFoundPage";

export interface IProjetoModuleContext {
  state?: string;
  id?: string;
}

export const ProjetoModuleContext = React.createContext<IProjetoModuleContext>(
  {}
);

const UsuarioContainer = () => {
  let { screenState, usuarioId } = useParams();

  const state = screenState ?? "";
  const validState = ["view", "edit", "create"].includes(state);

  const renderPage = () => {
    if (state && !validState) {
      return <NotFoundPage />;
    } else if (state && validState) {
      return (
        <Box>
          <Typography variant="h1">Usuário Detail</Typography>
        </Box>
      );
    } else {
      return (
        <Box>
          <Typography variant="h1">Usuário List</Typography>
        </Box>
      );
    }
  };

  const providerValue = {
    state: state,
    usuarioId,
  };

  return (
    <ProjetoModuleContext.Provider value={providerValue}>
      {renderPage()}
    </ProjetoModuleContext.Provider>
  );
};

export default UsuarioContainer;
