import { ElementType } from "react";
import { styled } from "@mui/material";
import Box, { BoxProps } from "@mui/material/Box";
import Stack, { StackProps } from "@mui/material/Stack";
import sysSizing from "../../../../ui/sysMaterialUi/sizing/sysSizes";
import { sysShadows } from "../../../../ui/sysMaterialUi/shadows/sysShadows";

interface IStyles {
  formContainer: ElementType<BoxProps>;
  informativeContainer: ElementType<StackProps>;
  optionsContainer: ElementType<StackProps>;
}

const UsuarioDetailViewStyles: IStyles = {
  formContainer: styled(Box)(() => ({
    padding: `0px ${sysSizing.spacingFixedLg}`,
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  })),
  informativeContainer: styled(Stack)(({ theme }) => ({
    padding: `${sysSizing.spacingFixedMd} ${sysSizing.spacingFixedLg}`,
    borderTop: `1px solid ${theme.palette.divider}`,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  })),
  optionsContainer: styled(Stack)(({ theme }) => ({
    padding: sysSizing.spacingFixedMd,
    borderTop: `1px solid ${theme.palette.divider}`,
    boxShadow: sysShadows.shadow1,
    flexDirection: "row",
    justifyContent: "end",
    gap: sysSizing.spacingFixedMd,
  })),
};

export default UsuarioDetailViewStyles;
