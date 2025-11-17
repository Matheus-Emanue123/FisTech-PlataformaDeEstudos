import {
  Box,
  BoxProps,
  styled,
  Typography,
  TypographyProps,
} from "@mui/material";
import { ElementType } from "react";
import sysSizing from "../../../../ui/sysMaterialUi/sizing/sysSizes";

interface IStyles {
  PageContainer: ElementType<BoxProps>;
  ContentWrapper: ElementType<BoxProps>;
  HeaderSection: ElementType<BoxProps>;
  PageTitle: ElementType<TypographyProps>;
  NotificationButton: ElementType<BoxProps>;
  NotificationBadge: ElementType<BoxProps>;
  StatsContainer: ElementType<BoxProps>;
  StatCard: ElementType<BoxProps>;
  StatIconWrapper: ElementType<BoxProps & { iconcolor?: string }>;
  StatNumber: ElementType<TypographyProps>;
  StatLabel: ElementType<TypographyProps>;
  TopicsSection: ElementType<BoxProps>;
  TopicContainer: ElementType<BoxProps>;
  TopicHeader: ElementType<BoxProps>;
  TopicTitleRow: ElementType<BoxProps>;
  TopicTitle: ElementType<TypographyProps>;
  TopicSubtitle: ElementType<TypographyProps>;
  ExpandIcon: ElementType<BoxProps & { isexpanded?: string }>;
  SubtopicsGrid: ElementType<BoxProps>;
  SubtopicCard: ElementType<BoxProps>;
  SubtopicTitle: ElementType<TypographyProps>;
}

const HomePageStyles: IStyles = {
  PageContainer: styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.background.default,
    overflowY: "auto",
  })),

  ContentWrapper: styled(Box)(() => ({
    maxWidth: "1400px",
    margin: "0 auto",
    padding: `${sysSizing.spacingFixedXl} ${sysSizing.spacingFixedLg}`,
    display: "flex",
    flexDirection: "column",
    gap: sysSizing.spacingFixedXl,
  })),

  HeaderSection: styled(Box)(() => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  })),

  PageTitle: styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: 700,
  })),

  NotificationButton: styled(Box)(({ theme }) => ({
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "48px",
    height: "48px",
    borderRadius: sysSizing.radiusMd,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: theme.palette.action.disabledBackground,
    },
  })),

  NotificationBadge: styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "8px",
    right: "8px",
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    borderRadius: "50%",
    width: "18px",
    height: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    fontWeight: 700,
  })),

  StatsContainer: styled(Box)(() => ({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: sysSizing.spacingFixedLg,
  })),

  StatCard: styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    borderRadius: sysSizing.radiusLg,
    padding: sysSizing.spacingFixedLg,
    display: "flex",
    flexDirection: "column",
    gap: sysSizing.spacingFixedSm,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    transition: "all 0.2s ease",
    "&:hover": {
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
      transform: "translateY(-2px)",
    },
  })),

  StatIconWrapper: styled(Box, {
    shouldForwardProp: (prop) => prop !== "iconcolor",
  })<{ iconcolor?: string }>(({ iconcolor = "#4c6ef5" }) => ({
    width: "40px",
    height: "40px",
    borderRadius: sysSizing.radiusMd,
    backgroundColor: `${iconcolor}20`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
  })),

  StatNumber: styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: 700,
    fontSize: "32px",
  })),

  StatLabel: styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: "14px",
  })),

  TopicsSection: styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    gap: sysSizing.spacingFixedXl,
  })),

  TopicContainer: styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    gap: sysSizing.spacingFixedLg,
  })),

  TopicHeader: styled(Box)(() => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    cursor: "pointer",
  })),

  TopicTitleRow: styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    gap: sysSizing.spacingFixedXs,
  })),

  TopicTitle: styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: 700,
    fontSize: "20px",
  })),

  TopicSubtitle: styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: "14px",
  })),

  ExpandIcon: styled(Box, {
    shouldForwardProp: (prop) => prop !== "isexpanded",
  })<{ isexpanded?: string }>(({ theme, isexpanded = "false" }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.text.secondary,
    transition: "transform 0.2s ease",
    transform: isexpanded === "true" ? "rotate(180deg)" : "rotate(0deg)",
    "& svg": {
      fontSize: "28px",
    },
  })),

  SubtopicsGrid: styled(Box)(() => ({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: sysSizing.spacingFixedLg,
    animation: "fadeIn 0.3s ease",
    "@keyframes fadeIn": {
      from: {
        opacity: 0,
        transform: "translateY(-10px)",
      },
      to: {
        opacity: 1,
        transform: "translateY(0)",
      },
    },
  })),

  SubtopicCard: styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: sysSizing.radiusMd,
    padding: sysSizing.spacingFixedLg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100px",
    border: `2px solid ${theme.palette.divider}`,
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      borderColor: theme.palette.secondary.main,
      backgroundColor: theme.palette.secondary.contrastText,
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
  })),

  SubtopicTitle: styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: 600,
    textAlign: "center",
    fontSize: "15px",
  })),
};

export default HomePageStyles;
