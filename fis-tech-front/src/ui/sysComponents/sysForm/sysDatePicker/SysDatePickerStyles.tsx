import {
  Box,
  BoxProps,
  styled,
  Typography,
  TypographyProps,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ElementType } from "react";
import sysSizing from "../../../sysMaterialUi/sizing/sysSizes";

interface IStyles {
  Container: ElementType<BoxProps>;
  MyDatePicker: ElementType<any>;
  ErrorMessageBody: ElementType<BoxProps>;
  ErrorMessageText: ElementType<TypographyProps>;
}

const SysDatePickerStyles: IStyles = {
  Container: styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: sysSizing.base.baseFixed075,
  })),
  MyDatePicker: styled(DatePicker)(({ theme }) => ({
    width: "100%",
    "& .MuiInputBase-root": {
      borderRadius: sysSizing.radiusXs,
      maxHeight: "40px",
      border: "none",
    },
    "& .MuiInputBase-root.Mui-disabled": {
      backgroundColor: theme.palette.action.disabledBackground,
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: theme.palette.info.light,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
      "&.Mui-error fieldset": {
        borderColor: theme.palette.error.main,
      },
      "&.Mui-error:hover fieldset": {
        borderColor: theme.palette.error.main,
      },
      "&.Mui-error.Mui-focused fieldset": {
        borderColor: theme.palette.error.main,
      },
      "&.Mui-disabled fieldset": {
        border: "none",
      },
      "&.Mui-disabled": {
        backgroundColor: theme.palette.action.disabledBackground,
      },
    },
    "& .MuiInputBase-input::placeholder": {
      color: theme.palette.info.light,
    },
    "&:hover .MuiInputBase-input::placeholder": {
      color: theme.palette.common.black,
    },
    "& .MuiInputBase-input.Mui-disabled": {
      color: theme.palette.text.disabled,
      WebkitTextFillColor: theme.palette.text.disabled,
    },
    "& .MuiSvgIcon-root": {
      color: theme.palette.common.black,
    },
    "&:hover .MuiSvgIcon-root": {
      color: theme.palette.common.black,
    },
    "& .MuiInputBase-root.Mui-disabled .MuiSvgIcon-root": {
      color: theme.palette.text.disabled,
    },
    // Estilos para o popup/modal do calendário
    "& .MuiPickersPopper-root": {
      "& .MuiPaper-root": {
        backgroundColor: theme.palette.common.white,
        boxShadow: theme.shadows[3],
      },
    },
    "& .MuiDateCalendar-root": {
      backgroundColor: theme.palette.common.white,
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
};

export default SysDatePickerStyles;
