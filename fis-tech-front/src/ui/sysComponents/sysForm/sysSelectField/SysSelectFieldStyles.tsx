import {
  Box,
  BoxProps,
  styled,
  Select,
  SelectProps,
  Typography,
  TypographyProps,
  MenuItemProps,
  MenuItem,
  IconButtonProps,
  IconButton,
} from "@mui/material";
import { ElementType } from "react";
import sysSizing from "../../../sysMaterialUi/sizing/sysSizes";

interface IStyles {
  Container: ElementType<BoxProps>;
  MySelectField: ElementType<SelectProps>;
  ErrorMessageBody: ElementType<BoxProps>;
  ErrorMessageText: ElementType<TypographyProps>;
  BoxFunctions: ElementType<TypographyProps>;
  InputSelect: ElementType<TypographyProps>;
  MyMenuItem: ElementType<MenuItemProps>;
  MyIconButton: ElementType<IconButtonProps>;
  PlaceHolderText: ElementType<TypographyProps>;
}

const SysSelectFieldStyles: IStyles = {
  Container: styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: sysSizing.base.baseFixed075,
  })),
  MySelectField: styled(Select)(({ theme }) => ({
    width: "100%",
    background: theme.palette.common.white,
    height: "40px",
    "& .MuiSelect-select": {
      padding: "10.5px 14px",
      display: "flex",
      alignItems: "center",
    },
    "&:hover .sys-select-text": {
      color: theme.palette.info.light,
    },
    "&:hover .sys-input-text": {
      color: theme.palette.primary.main,
    },
    "&.Mui-focused .sys-select-text": {
      color: theme.palette.primary.main,
    },
    "& .MuiOutlinedInput-root.Mui-error fieldset": {
      borderColor: theme.palette.error.main + " !important",
      borderWidth: "1px",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.info.light,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.error.main,
    },
    "&.Mui-error:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.error.main,
    },
    "&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.error.main,
    },

    "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.Mui-disabled": {
      backgroundColor: theme.palette.action.disabledBackground,
    },
    "&.Mui-disabled .sys-select-text, &.Mui-disabled .sys-input-text": {
      color: theme.palette.text.disabled,
      WebkitTextFillColor: theme.palette.text.disabled,
      opacity: 0.7,
    },
  })),
  ErrorMessageBody: styled(Box)(() => ({
    marginTop: sysSizing.spacingFixedXs,
    width: "100%",
    display: "flex",
    gap: sysSizing.spacingFixedSm,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  })),
  ErrorMessageText: styled(Typography)(() => ({
    display: "-webkit-box",
    overflow: "hidden",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    lineHeight: "13.84px",
    letterSpacing: "0.025em",
  })),
  BoxFunctions: styled(Typography)(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: "4px",
  })),
  MyMenuItem: styled(MenuItem)(({ theme }) => ({
    background: theme.palette.common.white,
    padding: `${sysSizing.spacingFixedSm} ${sysSizing.spacingFixedMd}`,
  })),
  MyIconButton: styled(IconButton)(({ theme }) => ({
    marginTop: "3px",
    width: 17,
    height: 17,
    minWidth: 17,
    minHeight: 17,
  })),
  InputSelect: styled(Typography)(({ theme }) => ({
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    width: "100%",
    color: theme.palette.info.light,
  })),
  PlaceHolderText: styled(Typography)(({ theme }) => ({
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    width: "100%",
    color: theme.palette.divider,
  })),
};

export default SysSelectFieldStyles;
