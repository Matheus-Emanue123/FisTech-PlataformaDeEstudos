import {
  Box,
  BoxProps,
  Typography,
  TypographyProps,
  styled,
  keyframes,
} from "@mui/material";
import { ElementType } from "react";
import sysSizing from "../../../../sysMaterialUi/sizing/sysSizes";

const bounce = keyframes`
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-2px); }
`;

interface IStyles {
  Container: ElementType<BoxProps>;
  LoadingWapper: ElementType<BoxProps>;
  LoadingArea: ElementType<BoxProps>;
  LoadingText: ElementType<TypographyProps>;
  ImgLoading: ElementType<BoxProps<"img">>;
  ReticenciaLoading: ElementType<TypographyProps>;
}

const IconCarregandoStyles: IStyles = {
  Container: styled(Box)(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    minHeight: "100%",
    margin: sysSizing.spacingRemXl,
  })),
  LoadingWapper: styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: sysSizing.spacingRemMd,
  })),
  LoadingArea: styled(Box)(() => ({
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
  })),
  LoadingText: styled(Typography)(({ theme }) => ({
    fontFamily: "sans-serif",
    fontSize: sysSizing.spacingRemMd,
    fontWeight: 700,
    marginTop: sysSizing.spacingRemSm,
    color: theme.palette.text.primary,
  })),
  ImgLoading: styled(Box)(() => ({
    position: "absolute",
    inset: 0,
    margin: "auto",
    width: 19.3548,
    height: 24,
  })),
  ReticenciaLoading: styled(Typography)(() => ({
    display: "inline-block",
    animation: `${bounce} 1.4s infinite ease-in-out`,
    fontSize: sysSizing.spacingRemLg,
    "&:nth-of-type(1)": { animationDelay: "0s" },
    "&:nth-of-type(2)": { animationDelay: "0.2s" },
    "&:nth-of-type(3)": { animationDelay: "0.4s" },
  })),
};

export default IconCarregandoStyles;
