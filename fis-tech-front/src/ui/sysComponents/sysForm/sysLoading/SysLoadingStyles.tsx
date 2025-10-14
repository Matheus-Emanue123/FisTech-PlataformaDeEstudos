import { ElementType } from "react";
import { styled, keyframes } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";

// Interface para garantir a tipagem do nosso objeto de estilos
interface IStyles {
  Container: ElementType<BoxProps & { fullScreen?: boolean }>; // Adicionamos a prop customizada aqui
  Spinner: ElementType<BoxProps>;
}

// 1. Animação de rotação, usando a função `keyframes` do MUI
const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// 2. Objeto principal de estilos que será exportado
const SysLoadingStyles: IStyles = {
  // O container que centraliza o spinner e pode ocupar a tela toda
  Container: styled(Box, {
    // Opção para não passar a prop `fullScreen` para o DOM
    shouldForwardProp: (prop) => prop !== 'fullScreen', 
  })<{ fullScreen?: boolean }>(({ theme, fullScreen }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    // Lógica condicional para o modo de tela cheia
    ...(fullScreen && {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      // Usar o zIndex do tema do MUI é uma boa prática
      zIndex: theme.zIndex.modal,
    }),
  })),

  // O spinner em si (o círculo que gira)
  Spinner: styled(Box)(({ theme }) => ({
    height: "40px",
    width: "40px",
    borderRadius: "50%",
    // Usando cores do tema do MUI
    border: `4px solid ${theme.palette.grey[300]}`,
    borderTopColor: theme.palette.primary.main, // Cor primária do seu tema
    // Aplicando a animação
    animation: `${spinAnimation} 0.8s linear infinite`,
  })),
};

export default SysLoadingStyles;