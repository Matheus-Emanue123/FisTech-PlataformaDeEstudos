import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import sysSizing from "../../../sysMaterialUi/sizing/sysSizes";

const NotFoundPageStyles = {
  MainContainer: styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    padding: sysSizing.spacingFixedLg,
  })),
  ButtonContainer: styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    gap: sysSizing.spacingFixedMd,
    alignItems: "center",
    marginTop: sysSizing.spacingFixedLg,
    "& button": {
      minWidth: "200px",
      borderRadius: sysSizing.radiusSm,
    },
  })),
  NotFoundImage: styled("img")(() => ({
    width: "200px",
    marginBottom: `calc(40px + ${sysSizing.spacingFixedLg})`,
    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
  })),
};

export default NotFoundPageStyles;
