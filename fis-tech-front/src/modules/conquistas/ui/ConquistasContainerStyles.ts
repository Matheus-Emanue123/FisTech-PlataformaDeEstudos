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
  maxWidth: 1200,
  width: "100%",
}));

const GridContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: sysSizing.spacingFixedLg,
  width: "100%",
}));

const GridItem = styled(Box)(({ theme }) => ({
  display: "flex",
}));

const ConquistaCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: sysSizing.radiusMd,
  padding: sysSizing.spacingFixedXl,
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100%",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.12)",
  },
}));

const ProgressWrapper = styled(Box)(({ theme }) => ({
  width: 140,
  height: 140,
  marginBottom: sysSizing.spacingFixedLg,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const ConquistaInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  width: "100%",
}));

const IconeBadge = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: sysSizing.radiusSm,
  backgroundColor: "#FFF9E6",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#FFD633",
  marginBottom: sysSizing.spacingFixedMd,
}));

const Styles = {
  Container,
  ContentWrapper,
  GridContainer,
  GridItem,
  ConquistaCard,
  ProgressWrapper,
  ConquistaInfo,
  IconeBadge,
};

export default Styles;
