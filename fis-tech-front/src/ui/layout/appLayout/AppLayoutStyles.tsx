import { ElementType } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";

interface IStyles {
  AppScreen: ElementType<BoxProps>;
  AppBody: ElementType<BoxProps>;
  AppContainerRouterSwitch: ElementType<BoxProps>;
}

const AppLayoutStyles: IStyles = {
  AppScreen: styled(Box)(() => ({
    display: "flex",
    width: "100vw",
    height: "100vh",
  })),
  AppBody: styled(Box)(() => ({
    display: "flex",
    width: "100%",
    height: `100%`,
  })),
  AppContainerRouterSwitch: styled(Box)(() => ({
    width: "100%",
    height: "100%",
    overflowY: "scroll",
  })),
};

export default AppLayoutStyles;