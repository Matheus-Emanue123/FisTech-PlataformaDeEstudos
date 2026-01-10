import { styled, Box } from "@mui/material";
import sysSizing from "../../../ui/sysMaterialUi/sizing/sysSizes";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  padding: sysSizing.spacingFixedXl,
  paddingTop: sysSizing.spacingFixedXl,
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  maxWidth: 800,
  width: "100%",
}));

const Section = styled(Box)(({ theme }) => ({
  marginBottom: sysSizing.spacingFixedXl,
}));

const SubSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: sysSizing.radiusMd,
  padding: sysSizing.spacingFixedLg,
  marginBottom: sysSizing.spacingFixedMd,
}));

const NotificationRow = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: `${sysSizing.spacingFixedMd} 0`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:last-child": {
    borderBottom: "none",
  },
}));

const PreferenceRow = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: `${sysSizing.spacingFixedMd} 0`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:last-child": {
    borderBottom: "none",
  },
}));

const ThemeGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: sysSizing.spacingFixedMd,
}));

const ThemeButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected: boolean }>(({ theme, selected }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: sysSizing.spacingFixedSm,
  padding: sysSizing.spacingFixedLg,
  backgroundColor: selected ? theme.palette.warning.light : theme.palette.common.white,
  border: selected ? `2px solid ${theme.palette.warning.main}` : `1px solid ${theme.palette.divider}`,
  borderRadius: sysSizing.radiusMd,
  cursor: "pointer",
  transition: "all 0.2s",
  "&:hover": {
    backgroundColor: selected ? theme.palette.warning.light : theme.palette.grey[50],
    transform: "translateY(-2px)",
  },
  "& svg": {
    fontSize: 28,
    color: selected ? theme.palette.warning.main : theme.palette.text.secondary,
  },
}));

const Styles = {
  Container,
  ContentWrapper,
  Section,
  SubSection,
  NotificationRow,
  PreferenceRow,
  ThemeGrid,
  ThemeButton,
};

export default Styles;
