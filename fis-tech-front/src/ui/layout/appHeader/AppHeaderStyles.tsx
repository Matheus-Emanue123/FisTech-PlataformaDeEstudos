import {
  Box,
  BoxProps,
  styled,
  Typography,
  TypographyProps,
} from "@mui/material";
import { ElementType, ImgHTMLAttributes } from "react";
import sysSizing from "../../sysMaterialUi/sizing/sysSizes";

interface IStyles {
  HeaderContainer: ElementType<BoxProps & { isExpanded?: boolean }>;
  LogoContainer: ElementType<BoxProps>;
  MenuContainer: ElementType<BoxProps>;
  MenuItem: ElementType<BoxProps & { isCollapsed?: boolean }>;
  MenuIcon: ElementType<BoxProps & { isCollapsed?: boolean }>;
  IconBox: ElementType<BoxProps<"img">>;
  MenuText: ElementType<TypographyProps>;
  LogoutContainer: ElementType<BoxProps>;
  LogoutIconCircle: ElementType<BoxProps>;
}

const AppHeaderStyles: IStyles = {
  HeaderContainer: styled(Box)<{ isExpanded?: boolean }>(
    ({ theme, isExpanded = true }) => ({
      backgroundColor: theme.palette.primary.dark,
      height: "100%",
      width: isExpanded ? "196px" : "90px",
      display: "flex",
      flexDirection: "column",
      alignItems: isExpanded ? "flex-start" : "center",
      justifyContent: "center",
      padding: `${sysSizing.spacingFixedLg} ${sysSizing.spacingFixedMd}`,
      transition: "width 0.3s ease",
    })
  ),
  LogoContainer: styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    gap: sysSizing.spacingRemSm,
    transition: "all 0.3s ease",
  })),
  MenuContainer: styled(Box)(() => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: sysSizing.base.baseFixed125,
  })),
  MenuItem: styled(Box)<{ isCollapsed?: boolean }>(
    ({ theme, isCollapsed = false }) => ({
      display: "flex",
      color: "#84878b",
      alignItems: "center",
      justifyContent: isCollapsed ? "center" : "flex-start",
      cursor: "pointer",
      transition: "all 0.3s ease",
      "&:hover": {
        color: theme.palette.common.white,
      },
    })
  ),
  MenuIcon: styled(Box)<{ isCollapsed?: boolean }>(
    ({ isCollapsed = false }) => ({
      width: sysSizing.spacingFixedLg,
      height: sysSizing.spacingFixedLg,
      marginRight: isCollapsed ? "0" : sysSizing.base.baseFixed075,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    })
  ),
  MenuText: styled(Typography)(({ theme }) => ({
    fontFamily: "Montserrat, sans-serif",
    fontSize: "13px",
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
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s ease",
    "&:hover": {},
  })),
  IconBox: styled(Box)(() => ({
    width: `${sysSizing.base.baseFixed125}`,
    height: `${sysSizing.base.baseFixed125}`,
    cursor: "pointer",
  })),
};

export default AppHeaderStyles;
