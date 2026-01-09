import { Box, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { NotFoundPage } from "../../../ui/sysPages/ui/notFoundPage/NotFoundPage";

export interface IAtividadeModuleContext {
  state?: string;
  id?: string;
}

export const AtividadeModuleContext = React.createContext<IAtividadeModuleContext>({});

const AtividadeContainer: React.FC = () => {
  const { screenState, atividadeId } = useParams();

  const state = screenState ?? "";
  const validState = ["view", "edit", "create"].includes(state);

  const renderPage = () => {
    if (state && !validState) {
      return <NotFoundPage />;
    } else if (state && validState) {
      return (
        <Box>
          <Typography variant="h1">Atividade Detail</Typography>
        </Box>
      );
    } else {
      return (
        <Box>
          <Typography variant="h1">Atividade List</Typography>
        </Box>
      );
    }
  };

  const providerValue = {
    state,
    atividadeId,
  };

  return (
    <AtividadeModuleContext.Provider value={providerValue}>
      {renderPage()}
    </AtividadeModuleContext.Provider>
  );
};

export default AtividadeContainer;
