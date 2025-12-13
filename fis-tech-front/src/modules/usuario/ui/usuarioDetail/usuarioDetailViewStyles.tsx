import { ElementType } from "react";
import { styled } from "@mui/material";
import Box, { BoxProps } from "@mui/material/Box";
import Stack, { StackProps } from "@mui/material/Stack";
import sysSizing from "../../../../ui/sysMaterialUi/sizing/sysSizes";
import { sysShadows } from "../../../../ui/sysMaterialUi/shadows/sysShadows";

interface IStyles {
  PageContainer: ElementType<BoxProps>;
  FormContainer: ElementType<BoxProps>;
  InformativeContainer: ElementType<StackProps>;
  OptionsContainer: ElementType<BoxProps>;
}

const UsuarioDetailViewStyles: IStyles = {
  PageContainer: styled(Box)(() => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  })),
  FormContainer: styled(Box)(() => ({
    padding: `0px ${sysSizing.spacingFixedLg}`,
    display: "flex",
    flexDirection: "column",
  })),
  InformativeContainer: styled(Stack)(({ theme }) => ({
    padding: `${sysSizing.spacingFixedMd} ${sysSizing.spacingFixedLg}`,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  })),
  OptionsContainer: styled(Box)(({}) => ({
    padding: sysSizing.spacingFixedMd,
    flexDirection: "row",
    justifyContent: "end",
    gap: sysSizing.spacingFixedMd,
    marginLeft: "auto",
  })),
};

export default UsuarioDetailViewStyles;
