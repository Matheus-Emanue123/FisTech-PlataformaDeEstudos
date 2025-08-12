import React from "react";
import { Box, Typography } from "@mui/material";
import { DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";
import { MyDatePicker, SysDatePickerStyles } from "./SysDatePickerStyles";
import { SysSimpleLabel } from "../sysSimpleLabel/SysSimpleLabel";

type ISysDatePicker = {
  label: string;
  value: Date | null;
  placeholder?: string;
  maxWidth?: string;
  error?: boolean;
  msgError?: string;
  format?: string;
  disabled?: boolean;
  changeValue: (date: Date | null) => void;
};

export const SysDatePicker: React.FC<ISysDatePicker> = ({
  label,
  value,
  placeholder = `Selecione ${label}`,
  maxWidth = "1000px",
  error = false,
  msgError = "Algo deu errado, por favor, tente novamente.",
  format = "dd/MM/yyyy",
  disabled = false,
  changeValue,
}) => {
  const handleChange = (date: Date | null) => {
    changeValue(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <Box sx={SysDatePickerStyles.container}>
        <SysSimpleLabel
          label={label ?? "Selecione uma data"}
          disabled={disabled}
        />
        <MyDatePicker
          value={value}
          onChange={handleChange}
          format={format}
          slotProps={{
            textField: {
              placeholder: placeholder,
              error: error,
              sx: {
                maxWidth: maxWidth,
              },
            },
          }}
          disabled={disabled}
        />
        <Box sx={[SysDatePickerStyles.errorMessageBody, { maxWidth: maxWidth }]}>
          {error && (
            <Typography
              variant="caption"
              color="error"
              sx={SysDatePickerStyles.errorMessageText}
            >
              {msgError}
            </Typography>
          )}
        </Box>
      </Box>
    </LocalizationProvider>
  );
};
