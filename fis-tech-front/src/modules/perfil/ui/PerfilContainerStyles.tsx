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
  maxWidth: 700,
  width: "100%",
  backgroundColor: theme.palette.background.paper,
  borderRadius: sysSizing.radiusMd,
  padding: sysSizing.spacingFixedXl,
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
}));

const UserHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingBottom: sysSizing.spacingFixedXl,
  borderBottom: `1px solid ${theme.palette.divider}`,
  marginBottom: sysSizing.spacingFixedXl,
}));

const AvatarCircle = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: "50%",
  backgroundColor: theme.palette.grey[200],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.grey[600],
}));

const Section = styled(Box)(({ theme }) => ({
  marginBottom: sysSizing.spacingFixedXl,
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: sysSizing.spacingFixedMd,
  backgroundColor: theme.palette.grey[50],
  borderRadius: sysSizing.radiusSm,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.grey[100],
  },
}));

const InfoRow = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: `${sysSizing.spacingFixedMd} 0`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:last-child": {
    borderBottom: "none",
  },
}));

const ActionsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: sysSizing.spacingFixedXl,
  paddingTop: sysSizing.spacingFixedXl,
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const Styles = {
  Container,
  ContentWrapper,
  UserHeader,
  AvatarCircle,
  Section,
  SectionHeader,
  InfoRow,
  ActionsContainer,
};

export default Styles;
