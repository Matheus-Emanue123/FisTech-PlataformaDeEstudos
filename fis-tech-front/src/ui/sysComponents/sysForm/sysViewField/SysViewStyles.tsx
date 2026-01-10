import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import sysSizes from "../../../sysMaterialUi/sizing/sysSizes";

interface IInfo {
  type: "label" | "placeholder";
  disabled: boolean;
}

export const SysViewFieldStyle = {
  Container: styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    gap: sysSizes.base.baseFixed075,
  })),

  Info: styled(Typography)<IInfo>(({ theme, type, disabled }) => ({
    width: "100%",
    color: disabled
      ? theme.palette.text.disabled
      : type === "label"
      ? theme.palette.common.black
      : theme.palette.info.main,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  })),
};
