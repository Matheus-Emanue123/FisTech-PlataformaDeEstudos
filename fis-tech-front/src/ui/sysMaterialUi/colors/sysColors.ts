import { PaletteOptions } from "@mui/material";

const secondaryScale = {
  escuro: "#01446E",
  normal: "#026AB2",
  claro: "#1976D2",
  fundo: "#E6E8EB",
};

const primaryScale = {
  escuro: "#05080C",
  normal: "#090F17",
  claro: "#2B3544",
};

const greenScale = {
  escuro: "#00802f",
  claro: "#c5f2c7",
  normal: "#00b050",
};

const grayScale = {
  escuro: "rgba(0, 0, 0, 0.72)",
  claro: "#d7e2ed",
  normal: "#666666",
  separator: "#0000001a",
  textPrimary: "#17171c",
  textSecondary: "#454554",
  disabled: "#a4a4b5",
};

const redScale = {
  escuro: "#990003",
  claro: "#ff6669",
  normal: "#d51013",
};

const yellowScale = {
  escuro: "#665200",
  claro: "#ffe066",
  normal: "#ffd633",
};

const sysBaseColors = {
  black: "#000000de",
  white: "#ffffff",
  hoverForWhite: "#e2e2e2",
  disabledBackground: "#e7e7e7",
};

const sysPalette: PaletteOptions = {
  common: {
    black: sysBaseColors.black,
    white: sysBaseColors.white,
  },
  primary: {
    light: primaryScale.claro,
    main: primaryScale.normal,
    dark: primaryScale.escuro,
  },
  secondary: {
    light: secondaryScale.claro,
    main: secondaryScale.normal,
    dark: secondaryScale.escuro,
    contrastText: secondaryScale.fundo,
  },
  success: {
    light: greenScale.claro,
    main: greenScale.normal,
    dark: greenScale.escuro,
  },
  warning: {
    light: yellowScale.claro,
    main: yellowScale.normal,
    dark: yellowScale.escuro,
  },
  info: {
    light: grayScale.claro,
    main: grayScale.normal,
    dark: grayScale.escuro,
  },
  error: {
    light: redScale.claro,
    main: redScale.normal,
    dark: redScale.escuro,
  },
  text: {
    primary: grayScale.textPrimary,
    secondary: grayScale.textSecondary,
    disabled: grayScale.disabled,
  },
  background: {
    paper: sysBaseColors.hoverForWhite,
    default: sysBaseColors.white,
  },
  action: {
    disabledBackground: sysBaseColors.disabledBackground,
  },
  divider: grayScale.separator,
};

export default sysPalette;
