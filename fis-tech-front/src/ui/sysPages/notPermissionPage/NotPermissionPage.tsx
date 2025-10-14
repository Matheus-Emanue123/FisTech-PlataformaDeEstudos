import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Styles from "./NotPermissionPageStyles";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import { Typography } from "@mui/material";
import sysSizing from "../../sysMaterialUi/sizing/sysSizes";

export const NotPermissionPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Styles.MainContainer>
      <Styles.NotPermissionImage
        src="/assets/svgs/logoEscura.svg"
        alt="Acesso Negado"
      />
      <Typography variant="h3">Acesso Negado</Typography>
      <Typography
        variant="body1"
        sx={{ margin: `${sysSizing.spacingFixedMd} 0px 40px 0px` }}
      >
        A página que você está tentando acessar é restrita e você não tem
        permissão para visualizá-la.
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
