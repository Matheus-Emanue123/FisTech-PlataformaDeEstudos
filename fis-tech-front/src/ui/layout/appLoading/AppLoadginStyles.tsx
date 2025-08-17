import styled from "@emotion/styled";
import { Box, BoxProps } from "@mui/material";
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
    backgroundColor: "rgba( 255, 255, 255, 0.5)",
    zIndex: 1300,
  })),
};

export default AppLoadingStyles;
