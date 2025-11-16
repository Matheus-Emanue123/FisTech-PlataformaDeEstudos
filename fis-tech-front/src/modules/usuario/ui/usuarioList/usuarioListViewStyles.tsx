import { ElementType } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material";
import sysSizing from "../../../../ui/sysMaterialUi/sizing/sysSizes";

interface IHeader extends BoxProps {
  isFixed: boolean;
}

interface IStyles {
  Container: ElementType<BoxProps>;
  Header: ElementType<IHeader>;
  HeaderLine: ElementType<BoxProps>;
  Body: ElementType<BoxProps>;
  UsuarioListContainer: ElementType<BoxProps>;
}

const UserListStyles: IStyles = {
  Container: styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    width: "100%",
    padding: sysSizing.contentPt,
    gap: sysSizing.spacingFixedXl,
    marginBottom: sysSizing.base.baseFixed6,
    transition: "padding 0.3s ease",
  })),
  Header: styled(Box, {
    shouldForwardProp: (prop) => prop !== "isFixed",
  })<IHeader>(({ theme, isFixed }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "sticky",
    top: 0,
    zIndex: 1,
    transition: "all 0.3s ease",
    padding: isFixed ? `${sysSizing.spacingFixedSm} 0` : 0,
    gap: isFixed ? 0 : sysSizing.spacingFixedXl,
  })),
  HeaderLine: styled(Box)(({ theme }) => ({
    gap: sysSizing.spacingFixedMd,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  })),
  Body: styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    gap: sysSizing.spacingFixedSm,
    minHeight: "300px",
  })),
  UsuarioListContainer: styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "stretch",
    width: "100%",
    gap: sysSizing.spacingFixedMd,
  })),
};

export default UserListStyles;
