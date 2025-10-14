import {
  Box,
  BoxProps,
  styled,
  Typography,
  TypographyProps,
} from "@mui/material";
import { ElementType, ImgHTMLAttributes } from "react";
import sysSizing from "../../sysMaterialUi/sizing/sysSizes";

const loginBG = "/assets/imgs/loginBG.png";

interface IStyles {
  PageContainer: ElementType<BoxProps>;
  LeftSide: ElementType<BoxProps>;
  RightSide: ElementType<BoxProps>;
  LoginFormContainer: ElementType<BoxProps>;
  Logo: ElementType<ImgHTMLAttributes<HTMLImageElement>>;
  WelcomeHeader: ElementType<TypographyProps>;
  Subtitle: ElementType<TypographyProps>;
  CallToAction: ElementType<TypographyProps>;
}

const LoginPageStyles: IStyles = {
  PageContainer: styled(Box)({
    display: "flex",
    width: "100%",
    height: "100%",
  }),
  LeftSide: styled(Box)(({ theme }) => ({
    flex: 1,
    backgroundImage: `url(${loginBG})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    [theme.breakpoints.down("lg")]: {
      display: "none",
    },
  })),
  RightSide: styled(Box)(({ theme }) => ({
    width: "500px",
    height: "100%",
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: sysSizing.spacingFixedMd,
    padding: "40px",
    boxShadow: "-4px 0 20px rgba(0, 0, 0, 0.1)",
    [theme.breakpoints.down("lg")]: {
      width: "100%",
      boxShadow: "none",
    },
  })),
  LoginFormContainer: styled(Box)(() => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  })),
  Logo: styled("img")({
    width: "50%",
  }),
  WelcomeHeader: styled(Typography)(({ theme }) => ({
    textAlign: "left",
    whiteSpace: "nowrap",
    letterSpacing: "1px",
  })),
  Subtitle: styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    letterSpacing: "0.8px",
    "& span": {
      cursor: "pointer",
      color: theme.palette.secondary.main,
      fontWeight: 600,
    },
    "& span:hover": {
      textDecoration: "underline",
    },
  })),
  CallToAction: styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    textAlign: "center",
    fontSize: "20px",
    marginTop: "30px",
    alignSelf: "center",
    maxWidth: "280px",
    lineHeight: 1.35,
  })),
};

export default LoginPageStyles;
