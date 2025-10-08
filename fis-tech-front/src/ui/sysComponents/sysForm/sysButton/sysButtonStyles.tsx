import { Button, styled } from "@mui/material";
import sysSizing from "../../../sysMaterialUi/sizing/sysSizes";

interface IButton {
  mode: "primary" | "secondary" | "link";
}

const SysButtonContainer = styled(Button)<IButton>(({ theme, mode }) => ({
  minWidth: "89px",
  height: "40px",
  padding: `${sysSizing.spacingFixedSm} ${sysSizing.spacingFixedLg}`,
  borderRadius: sysSizing.radiusXs,
  transition: "background-color 0.2s ease-in, color 0.2s ease-in",
  ...(mode === "primary" && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    "&.Mui-disabled": {
      cursor: "not-allowed",
      pointerEvents: "all !important",
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.common.white,
      border: `1px solid ${theme.palette.divider}`,
    },
  }),
  ...(mode === "secondary" && {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    border: `1px solid ${theme.palette.primary.main}`,
    "&:hover": {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.contrastText,
    },
    "&.Mui-disabled": {
      cursor: "not-allowed",
      pointerEvents: "all !important",
      color: theme.palette.divider,
      backgroundColor: theme.palette.common.white,
      borderColor: theme.palette.divider,
    },
  }),
  ...(mode === "link" && {
    color: theme.palette.primary.main,
    textDecoration: "underline",
    border: "1px solid transparent",
    transition: "border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      textDecoration: "underline",
      borderColor: theme.palette.primary.main,
    },
  }),
}));

const SysButtonStyles = {};

export { SysButtonContainer, SysButtonStyles };
