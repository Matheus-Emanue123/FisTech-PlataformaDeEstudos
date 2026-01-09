import { Box, Typography } from "@mui/material";
import React from "react";
import Styles from "./ConquistasContainerStyles";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import StarsOutlinedIcon from "@mui/icons-material/StarsOutlined";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface IConquista {
  id: number;
  progresso: number;
  textoProgresso: string;
  titulo: string;
  descricao: string;
  icone: "trophy" | "star" | "fire";
}

const ConquistasContainer: React.FC = () => {
  // Dados mockados
  const conquistasMock: IConquista[] = [
    {
      id: 1,
      progresso: 100,
      textoProgresso: "Completo!",
      titulo: "Primeira Lição",
      descricao: "Complete sua primeira lição",
      icone: "trophy",
    },
    {
      id: 2,
      progresso: 71,
      textoProgresso: "5 de 7 dias",
      titulo: "Sequência de 7 dias",
      descricao: "Estude por 7 dias seguidos",
      icone: "fire",
    },
    {
      id: 3,
      progresso: 80,
      textoProgresso: "8 de 10",
      titulo: "10 Exercícios",
      descricao: "Resolva 10 exercícios",
      icone: "star",
    },
    {
      id: 4,
      progresso: 45,
      textoProgresso: "No caminho",
      titulo: "Mestre da Física",
      descricao: "Complete todos os tópicos de mecânica",
      icone: "trophy",
    },
    {
      id: 5,
      progresso: 23,
      textoProgresso: "7 de 30 dias",
      titulo: "Estudante Dedicado",
      descricao: "Estude por 30 dias",
      icone: "fire",
    },
    {
      id: 6,
      progresso: 62,
      textoProgresso: "31 de 50",
      titulo: "Expert em Questões",
      descricao: "Acerte 50 questões",
      icone: "star",
    },
  ];

  const renderIcone = (tipo: "trophy" | "star" | "fire") => {
    const iconProps = { sx: { fontSize: 24 } };
    switch (tipo) {
      case "trophy":
        return <EmojiEventsOutlinedIcon {...iconProps} />;
      case "star":
        return <StarsOutlinedIcon {...iconProps} />;
      case "fire":
        return <LocalFireDepartmentOutlinedIcon {...iconProps} />;
    }
  };

  return (
    <Styles.Container>
      <Styles.ContentWrapper>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 4 }}>
          Conquistas
        </Typography>

        <Styles.GridContainer>
          {conquistasMock.map((conquista) => (
            <Styles.GridItem key={conquista.id}>
              <Styles.ConquistaCard>
                <Styles.ProgressWrapper>
                  <CircularProgressbar
                    value={conquista.progresso}
                    text={`${conquista.progresso}%`}
                    styles={buildStyles({
                      textSize: "24px",
                      pathColor: "#026AB2",
                      textColor: "#090F17",
                      trailColor: "#E6E8EB",
                    })}
                  />
                  <Typography
                    variant="caption"
                    sx={{ mt: 1, color: "text.secondary" }}
                  >
                    {conquista.textoProgresso}
                  </Typography>
                </Styles.ProgressWrapper>

                <Styles.ConquistaInfo>
                  <Styles.IconeBadge>{renderIcone(conquista.icone)}</Styles.IconeBadge>
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {conquista.titulo}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {conquista.descricao}
                  </Typography>
                </Styles.ConquistaInfo>
              </Styles.ConquistaCard>
            </Styles.GridItem>
          ))}
        </Styles.GridContainer>
      </Styles.ContentWrapper>
    </Styles.Container>
  );
};

export default ConquistasContainer;
