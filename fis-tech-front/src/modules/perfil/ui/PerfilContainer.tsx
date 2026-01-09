import { Box, Button, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UseAuthContext from "../../../utils/hooks/useAuth/UseAuthContext";
import Styles from "./PerfilContainerStyles";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";

const PerfilContainer: React.FC = () => {
  const { signOut } = useContext(UseAuthContext);
  const navigate = useNavigate();

  // Dados mockados
  const userData = {
    nome: "Matheusinho",
    nivel: "Lvl 02",
    email: "matheus@email.com",
    password: "************",
    titulo: "Físico Incerto",
  };

  return (
    <Styles.Container>
      <Styles.ContentWrapper>
        {/* Header com informações do usuário */}
        <Styles.UserHeader>
          <Styles.AvatarCircle>
            <PersonOutlineIcon sx={{ fontSize: 48 }} />
          </Styles.AvatarCircle>
          <Typography variant="h5" sx={{ fontWeight: 600, mt: 2 }}>
            {userData.nome}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {userData.nivel}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
            {userData.email}
          </Typography>
        </Styles.UserHeader>

        {/* Seção de Conquistas */}
        <Styles.Section>
          <Styles.SectionHeader onClick={() => navigate("/conquistas")}>
            <EmojiEventsOutlinedIcon sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Conquistas
            </Typography>
          </Styles.SectionHeader>
        </Styles.Section>

        {/* Seção de Informações Pessoais */}
        <Styles.Section>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            Informações Pessoais
          </Typography>

          <Styles.InfoRow>
            <Box>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Nome
              </Typography>
              <Typography variant="body1">{userData.nome}</Typography>
            </Box>
            <Button variant="text" size="small">
              Editar
            </Button>
          </Styles.InfoRow>

          <Styles.InfoRow>
            <Box>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Endereço de Email
              </Typography>
              <Typography variant="body1">{userData.email}</Typography>
            </Box>
            <Button variant="text" size="small">
              Editar
            </Button>
          </Styles.InfoRow>

          <Styles.InfoRow>
            <Box>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Password
              </Typography>
              <Typography variant="body1">{userData.password}</Typography>
            </Box>
            <Button variant="text" size="small">
              Editar
            </Button>
          </Styles.InfoRow>

          <Styles.InfoRow>
            <Box>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Título
              </Typography>
              <Typography variant="body1">{userData.titulo}</Typography>
            </Box>
            <Button variant="text" size="small">
              Trocar
            </Button>
          </Styles.InfoRow>
        </Styles.Section>

        {/* Botões de Ação */}
        <Styles.ActionsContainer>
          <Button variant="text" color="error" size="large">
            Deletar conta
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            onClick={() => signOut()}
          >
            Logout
          </Button>
        </Styles.ActionsContainer>
      </Styles.ContentWrapper>
    </Styles.Container>
  );
};

export default PerfilContainer;
