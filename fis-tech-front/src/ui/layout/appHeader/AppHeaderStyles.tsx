import {
  Box,
  BoxProps,
  styled,
  Typography,
  TypographyProps,
} from "@mui/material";
import { ElementType } from "react";
import sysSizing from "../../sysMaterialUi/sizing/sysSizes";

interface IStyles {
  HeaderContainer: ElementType<BoxProps & { isExpanded?: boolean }>;
  LogoContainer: ElementType<BoxProps>;
  MenuContainer: ElementType<BoxProps>;
  MenuItem: ElementType<BoxProps & { isCollapsed?: boolean }>;
  MenuText: ElementType<TypographyProps>;
  LogoutContainer: ElementType<BoxProps>;
  LogoutIconCircle: ElementType<BoxProps>;
}

const AppHeaderStyles: IStyles = {
  HeaderContainer: styled(Box)<{ isExpanded?: boolean }>(
    ({ theme, isExpanded = true }) => ({
      backgroundColor: theme.palette.primary.dark,
      height: "100%",
      width: isExpanded ? "240px" : "72px",
      display: "flex",
      flexDirection: "column",
      alignItems: isExpanded ? "flex-start" : "center",
      padding: `0 ${sysSizing.spacingFixedSm}`,
      justifyContent: "center",
      transition: "width .2s linear",
    })
  ),
  LogoContainer: styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    position: "relative",
    gap: sysSizing.spacingRemSm,
    transition: "all 0.2s linear",
    padding: `${sysSizing.spacingFixedLg} ${sysSizing.spacingFixedMd}`,
    width: "100%",
  })),
  MenuContainer: styled(Box)(() => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: sysSizing.spacingFixedSm,
    width: "100%",
  })),
  MenuItem: styled(Box)<{ isCollapsed?: boolean }>(
    ({ theme, isCollapsed = false }) => ({
      display: "flex",
      color: "#84878b",

      alignItems: "center",
      justifyContent: isCollapsed ? "center" : "flex-start",
      cursor: "pointer",
      transition: "all 0.2s linear",
      gap: sysSizing.base.baseFixed125,
      padding: `${sysSizing.spacingFixedMd} ${sysSizing.spacingFixedMd}`,
      borderRadius: sysSizing.radiusSm,
      "&:hover": {
        color: theme.palette.common.white,
        background: "#353535",
      },
    })
  ),
  MenuText: styled(Typography)(() => ({
    fontFamily: "Montserrat, sans-serif",
    fontSize: "13px",
    letterSpacing: "0.15px",
    fontWeight: 700,
    transition: "color 0.3s ease",
    userSelect: "none",
  })),
  LogoutContainer: styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
  })),
  LogoutIconCircle: styled(Box)(({ theme }) => ({
    marginBottom: sysSizing.spacingFixedXl,
    marginLeft: sysSizing.spacingFixedMd,
    color: theme.palette.common.white,
    padding: `${sysSizing.spacingFixedSm} ${sysSizing.spacingFixedSm} 0px 0px`,
  })),
};

export default AppHeaderStyles;
