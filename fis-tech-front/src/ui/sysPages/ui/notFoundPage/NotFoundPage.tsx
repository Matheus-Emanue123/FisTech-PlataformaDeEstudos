import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Styles from "./NotFoundPageStyles";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import { Typography } from "@mui/material";
import sysSizing from "../../../sysMaterialUi/sizing/sysSizes";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Styles.MainContainer>
      <Styles.NotFoundImage
        src="/assets/svgs/logoEscura.svg"
        alt="Página não encontrada"
      />
      <Typography variant="h3">Página não encontrada</Typography>
      <Typography
        variant="body1"
        sx={{ margin: `${sysSizing.spacingFixedMd} 0px 40px 0px` }}
      >
        A página que você está tentando acessar não existe ou se encontra
        indisponível.
      </Typography>
      <Styles.ButtonContainer>
        <Button
          variant="contained"
          startIcon={<ReplyAllIcon />}
          onClick={() => navigate("/")}
        >
          Voltar para a página inicial
        </Button>
      </Styles.ButtonContainer>
    </Styles.MainContainer>
  );
};
