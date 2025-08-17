// import {
//   Box,
//   BoxProps,
//   Typography,
//   TypographyProps,
//   styled,
//   keyframes,
// } from "@mui/material";
// import { ElementType } from "react";
// import sysSizing from "../../../../sysMaterialUi/sizing/sysSizes";
// import { TIME_LOADING_ANIMATION } from "../../../../../typings/ConfigEnvironment";

// const spin = keyframes`
//   0%   { transform: rotate(0deg); }
//   100% { transform: rotate(360deg); }
// `;

// const bounce = keyframes`
//   0%, 80%, 100% { transform: translateY(0); }
//   40% { transform: translateY(-2px); }
// `;

// interface IStyles {
//   Container: ElementType<BoxProps>;
//   LoadingWapper: ElementType<BoxProps>;
//   LoadingArea: ElementType<BoxProps>;
//   LoadingText: ElementType<TypographyProps>;
//   ImgLoading: ElementType<BoxProps<"img">>;
//   ReticenciaLoading: ElementType<TypographyProps>;
// }

// const IconCarregandoStyles: IStyles = {
//   Container: styled(Box)(() => ({
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     alignSelf: "center",
//     minHeight: "100%",
//     margin: sysSizing.spacingRemXl,
//   })),

//   LoadingWapper: styled(Box)(() => ({
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     margin: sysSizing.spacingRemMd,
//   })),

//   LoadingArea: styled(Box)(() => ({
//     position: "relative",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     width: 50,
//     height: 62,
//     animation: `${spin} ${TIME_LOADING_ANIMATION} linear infinite`,
//     willChange: "transform",
//   })),

//   LoadingText: styled(Typography)(({ theme }) => ({
//     fontFamily: "sans-serif",
//     fontSize: sysSizing.spacingRemMd,
//     fontWeight: 700,
//     marginTop: sysSizing.spacingRemSm,
//     color: theme.palette.text.primary,
//   })),

//   ImgLoading: styled(Box)({
//     position: "absolute",
//     inset: 0,
//     margin: "auto",
//     width: 50,
//     pointerEvents: "none",
//     "@media (prefers-reduced-motion: reduce)": {
//       animation: "none",
//     },
//   }),
//   ReticenciaLoading: styled(Typography)({
//     display: "inline-block",
//     animation: `${bounce} 1.4s infinite ease-in-out`,
//     fontSize: sysSizing.spacingRemLg,
//     "&:nth-of-type(1)": { animationDelay: "0s" },
//     "&:nth-of-type(2)": { animationDelay: "0.2s" },
//     "&:nth-of-type(3)": { animationDelay: "0.4s" },
//   }),
// };

// export default IconCarregandoStyles;

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// import {
//   Box,
//   BoxProps,
//   Typography,
//   TypographyProps,
//   styled,
//   keyframes,
// } from "@mui/material";
// import { ElementType } from "react";
// import sysSizing from "../../../../sysMaterialUi/sizing/sysSizes";
// import { TIME_LOADING_ANIMATION } from "../../../../../typings/ConfigEnvironment";

// const pulse = keyframes`
//   0%   { opacity: 1;   transform: scale(1); }
//   50%  { opacity: 0.65; transform: scale(1.04); } /* não fica transparente */
//   100% { opacity: 1;   transform: scale(1); }
// `;

// const bounce = keyframes`
//   0%, 80%, 100% { transform: translateY(0); }
//   40% { transform: translateY(-2px); }
// `;

// interface IStyles {
//   Container: ElementType<BoxProps>;
//   LoadingWapper: ElementType<BoxProps>;
//   LoadingArea: ElementType<BoxProps>;
//   LoadingText: ElementType<TypographyProps>;
//   ImgLoading: ElementType<BoxProps<"img">>;
//   ReticenciaLoading: ElementType<TypographyProps>;
// }

// const IconCarregandoStyles: IStyles = {
//   Container: styled(Box)(() => ({
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     alignSelf: "center",
//     minHeight: "100%",
//     margin: sysSizing.spacingRemXl,
//   })),

//   LoadingWapper: styled(Box)(() => ({
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     margin: sysSizing.spacingRemMd,
//   })),
//   LoadingArea: styled(Box)(() => ({
//     position: "relative",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     width: 50,
//     height: 62,
//   })),
//   LoadingText: styled(Typography)(({ theme }) => ({
//     fontFamily: "sans-serif",
//     fontSize: sysSizing.spacingRemMd,
//     fontWeight: 700,
//     marginTop: sysSizing.spacingRemSm,
//     color: theme.palette.text.primary,
//   })),
//   ImgLoading: styled(Box)({
//     position: "absolute",
//     inset: 0,
//     margin: "auto",
//     width: 50,
//     pointerEvents: "none",
//     animation: `${pulse} ${TIME_LOADING_ANIMATION} ease-in-out infinite`,
//     willChange: "opacity, transform",
//     "@media (prefers-reduced-motion: reduce)": {
//       animation: "none",
//     },
//   }),
//   ReticenciaLoading: styled(Typography)({
//     display: "inline-block",
//     animation: `${bounce} 1.4s infinite ease-in-out`,
//     fontSize: sysSizing.spacingRemLg,
//     "&:nth-of-type(1)": { animationDelay: "0s" },
//     "&:nth-of-type(2)": { animationDelay: "0.2s" },
//     "&:nth-of-type(3)": { animationDelay: "0.4s" },
//   }),
// };

// export default IconCarregandoStyles;

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
    width: 50,
    height: 62,
  })),

  LoadingText: styled(Typography)(({ theme }) => ({
    fontFamily: "sans-serif",
    fontSize: sysSizing.spacingRemMd,
    fontWeight: 700,
    marginTop: sysSizing.spacingRemSm,
    color: theme.palette.text.primary,
  })),
  ImgLoading: styled(Box)({
    position: "absolute",
    inset: 0,
    margin: "auto",
    width: 50,
    height: 62,
  }),
  ReticenciaLoading: styled(Typography)({
    display: "inline-block",
    animation: `${bounce} 1.4s infinite ease-in-out`,
    fontSize: sysSizing.spacingRemLg,
    "&:nth-of-type(1)": { animationDelay: "0s" },
    "&:nth-of-type(2)": { animationDelay: "0.2s" },
    "&:nth-of-type(3)": { animationDelay: "0.4s" },
  }),
};

export default IconCarregandoStyles;
