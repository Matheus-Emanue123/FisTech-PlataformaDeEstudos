import React, { ElementType } from "react";
import { styled } from "@mui/material";
import Box, { BoxProps } from "@mui/material/Box";
import sysSizing from "../../sysMaterialUi/sizing/sysSizes";

interface IStyles {
  container: ElementType<BoxProps>;
}

const SysSortByStyles: IStyles = {
  container: styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: sysSizing.spacingFixedSm,
    cursor: "pointer",
    padding: `${sysSizing.spacingFixedXs} ${sysSizing.spacingFixedSm}`,
    borderRadius: sysSizing.radiusSm,
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: theme.palette.background,
    },
  })),
};

export default SysSortByStyles;
