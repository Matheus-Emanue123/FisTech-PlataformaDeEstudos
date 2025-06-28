import { createTheme } from "@mui/material";
import sysFonts from "./fonts/sysFonts";
import sysPalette from "./colors/sysColors";
import { TypographyStyleOptions } from "@mui/material/styles/createTypography";

const typography = sysFonts.getTypography() as any;

export const MaterialUiTheme = createTheme({
  palette: {
    ...sysPalette,
  },
  // Ensure that typography values (like fontSize) are numbers, not strings
  typography,
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1024,
      xl: 1440,
    },
  },
});
