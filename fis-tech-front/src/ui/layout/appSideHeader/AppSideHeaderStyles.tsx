import { Box, BoxProps, styled, Typography, TypographyProps } from "@mui/material";
import { ElementType } from "react";

interface IStyles {
  SideHeaderContainer: ElementType<BoxProps & { isExpanded?: boolean }>;
  LogoContainer: ElementType<BoxProps>;
  MenuContainer: ElementType<BoxProps>;        
  MenuItem: ElementType<BoxProps & { isCollapsed?: boolean }>;             
  MenuIcon: ElementType<BoxProps & { isCollapsed?: boolean }>;             
  MenuText: ElementType<TypographyProps>;
  LogoutContainer: ElementType<BoxProps>;
  LogoutIconCircle: ElementType<BoxProps>;
}

const AppSideHeaderStyles: IStyles = {
  SideHeaderContainer: styled(Box)<{ isExpanded?: boolean }>(({ theme, isExpanded = true }) => ({
    backgroundColor: theme.palette.primary.dark, 
    height: "100%",
    width: isExpanded ? "196px" : "60px",
    display: "flex",
    flexDirection: "column",
    transition: "width 0.3s ease",
  })),
  
  LogoContainer: styled(Box)(({ theme }) => ({
    padding: "24px 20px",
    minHeight: "72px", // Altura mínima para o botão toggle
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  })),

  MenuContainer: styled(Box)(({ theme }) => ({
    flex: 1,
    padding: "32px 0", // Mais padding para centralizar melhor
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // Centraliza verticalmente os itens do menu
    gap: "8px", // Espaçamento entre os itens do menu
  })),

  MenuItem: styled(Box)<{ isCollapsed?: boolean }>(({ theme, isCollapsed = false }) => ({
    display: "flex",
    alignItems: "center",
    padding: isCollapsed ? "12px" : "12px 20px",
    justifyContent: isCollapsed ? "center" : "flex-start",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  })),

  MenuIcon: styled(Box)<{ isCollapsed?: boolean }>(({ theme, isCollapsed = false }) => ({
    width: "24px",
    height: "24px",
    marginRight: isCollapsed ? "0" : "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  })),

  MenuText: styled(Typography)(({ theme }) => ({
    fontFamily: "Montserrat, sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    color: "rgba(255, 255, 255, 0.5)",
    transition: "color 0.3s ease",
    userSelect: "none", 
  })),

  LogoutContainer: styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: "12px 20px", // Mesmo padding dos itens de menu
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
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  })),
};

export default AppSideHeaderStyles;