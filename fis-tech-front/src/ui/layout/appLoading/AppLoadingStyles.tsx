import { Box, BoxProps, styled } from "@mui/material";
import { ElementType } from "react";

interface IStyles {
  Container: ElementType<BoxProps>;
}

const AppLoadingStyles: IStyles = {
  Container: styled(Box)(({ theme }) => ({
    position: "fixed",
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.common.white,
    zIndex: 1300,
  })),
};

export default AppLoadingStyles;
