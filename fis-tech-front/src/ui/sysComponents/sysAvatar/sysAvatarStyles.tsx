import { ElementType } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material";
import Avatar, { AvatarProps } from "@mui/material/Avatar";
import sysSizing from "../../sysMaterialUi/sizing/sysSizes";

interface IContainer extends BoxProps {
  cursorPointer?: boolean;
  size: "small" | "medium" | "large";
  ativarContorno: boolean;
}
interface ISysAvatarStyles {
  Container: ElementType<IContainer>;
  Avatar: ElementType<AvatarProps>;
}

const SysAvatarStyles: ISysAvatarStyles = {
  Container: styled(Box, {
    shouldForwardProp: (prop) =>
      prop !== "cursorPointer" && prop !== "size" && prop !== "ativarContorno",
  })<IContainer>(({ theme, cursorPointer, size, ativarContorno }) => ({
    width:
      size === "small"
        ? sysSizing.componentsButtonSmallMinHeight
        : size === "medium"
        ? sysSizing.spacingRemXl
        : sysSizing.componentsButtonSmallMinHeight,
    height:
      size === "small"
        ? sysSizing.componentsButtonMediumMinHeight
        : size === "medium"
        ? sysSizing.spacingRemXl
        : sysSizing.componentsButtonMediumMinHeight,
    borderRadius: "50%",
    border: !ativarContorno
      ? "none"
      : `2px solid ${theme?.palette.common.white}`,
    display: "flex",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    padding: !ativarContorno ? "none" : sysSizing.spacingFixedXs,
    cursor: cursorPointer ? "pointer" : "inherit",
    flexShrink: 0,
    minWidth: ativarContorno
      ? sysSizing.componentsButtonMediumMinHeight
      : "auto",
    minHeight: ativarContorno
      ? sysSizing.componentsButtonMediumMinHeight
      : "auto",
    "& .MuiAvatar-root": {
      margin: 0,
    },
  })),
  Avatar: styled(Avatar)(({ theme }) => ({
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.primary.dark,
    flexShrink: 0,
    margin: 0,
    "&:focus": {
      backgroundColor: theme.palette.text.primary,
      color: theme.palette.common.white,
      outline: "none",
    },
  })),
};

export default SysAvatarStyles;
