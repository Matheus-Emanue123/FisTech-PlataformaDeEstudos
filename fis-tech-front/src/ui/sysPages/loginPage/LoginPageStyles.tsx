import {
  Box,
  BoxProps,
  styled,
  Typography,
  TypographyProps,
} from "@mui/material";
import { ElementType, ImgHTMLAttributes } from "react";

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
    width: "100vw",
    height: "100vh",
  }),

  LeftSide: styled(Box)({
    flex: 1,
    backgroundImage: `url(${loginBG})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    "@media (max-width: 900px)": {
      display: "none",
    },
  }),

  RightSide: styled(Box)(({ theme }) => ({
    width: "600px",
    backgroundColor: theme.palette.grey[200],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 2%",
    boxShadow: "-4px 0 20px rgba(0, 0, 0, 0.1)",
    "@media (max-width: 900px)": {
      width: "100%",
      boxShadow: "none",
    },
  })),

  LoginFormContainer: styled(Box)(({ theme }) => ({
    width: "100%",
    maxWidth: "480px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  })),

  Logo: styled("img")({
    width: "50%",
    marginBottom: "24px",
  }),

  WelcomeHeader: styled(Typography)(({ theme }) => ({
    ...theme.typography.h2,
    marginBottom: theme.spacing(0.5),
    textAlign: "left",
    whiteSpace: "nowrap",
  })),

  Subtitle: styled(Typography)(({ theme }) => ({
    ...theme.typography.body1,
    marginBottom: theme.spacing(1),
    textAlign: "left",
  })),

  CallToAction: styled(Typography)(({ theme }) => ({
    ...theme.typography.h4,
    color: theme.palette.text.secondary,
    textAlign: "center",
    fontSize: "20px",
    marginTop: theme.spacing(3),
    alignSelf: "center",
  })),
};

export default LoginPageStyles;
