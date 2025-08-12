import { styled } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import sysSizing from "../../../sysMaterialUi/sizing/sysSizes";

const MyDatePicker = styled(DatePicker)(({ theme }) => ({
  width: "100%",
  "& .MuiInputBase-root": {
    borderRadius: sysSizing.radiusXs,
    maxHeight: "40px",
    border: "none",
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
      backgroundColor: "#e7e7e7",
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
    color: theme.palette.info.light,
  },
  "&:hover .MuiSvgIcon-root": {
    color: theme.palette.common.black,
  },
  "& .MuiInputBase-root.Mui-disabled .MuiSvgIcon-root": {
    color: theme.palette.text.disabled,
  },
}));

const SysDatePickerStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: sysSizing.base.baseFixed075,
  },
  label: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    marginBottom: sysSizing.base.baseFixed075,
  },
  errorMessageBody: {
    marginTop: sysSizing.spacingFixedXs,
    width: "100%",
    display: "flex",
    gap: sysSizing.spacingFixedSm,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  errorMessageText: {
    display: "-webkit-box",
    overflow: "hidden",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    lineHeight: "13.84px",
    letterSpacing: "0.025em",
  },
};

export { MyDatePicker, SysDatePickerStyles };
