import { ElementType } from "react";
import { styled } from "@mui/material";
import Box, { BoxProps } from "@mui/material/Box";
import sysSizing from "../../../../../../ui/sysMaterialUi/sizing/sysSizes";

interface IStyles {
  container: ElementType<BoxProps>;
  rowContainer: ElementType<BoxProps>;
}

const UsuarioCardStyles: IStyles = {
  container: styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    width: `calc(33% - ${sysSizing.spacingFixedMd})`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    padding: sysSizing.spacingFixedMd,
    borderRadius: sysSizing.radiusSm,
    gap: sysSizing.spacingFixedSm,
    transition: "all 0.3s ease",

    [theme.breakpoints.down("lg")]: {
      width: `calc(50% - ${sysSizing.spacingFixedMd})`,
    },
    [theme.breakpoints.down("md")]: { width: `100%` },
  })),
  rowContainer: styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: sysSizing.spacingFixedSm,
  })),
};

export default UsuarioCardStyles;
