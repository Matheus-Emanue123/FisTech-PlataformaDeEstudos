import React from "react";
import {
  SelectProps,
  Typography,
  SxProps,
  SelectChangeEvent,
  ListItemText,
} from "@mui/material";
import Styles from "./SysSelectFieldStyles";
import { SysSimpleLabel } from "../sysSimpleLabel/SysSimpleLabel";
import { hasValue } from "../../../../utils/libs/hasValue";
import { SysSvg } from "../../SysSvg/SysSvg";
import { HeaderSvgs } from "../../../../utils/svg/headerSvgs";
import { SysViewField } from "../sysViewField/SysViewField";

export type IOptionToSysSelectetField = {
  value: string;
  label: string;
};

type ISysSelectField = {
  nameField: string;
  label: string;
  value: string;
  options: IOptionToSysSelectetField[];
  placeholder?: string;
  maxWidth?: string;
  error?: boolean;
  msgError?: string;
  readOnly?: boolean;
  changeValue: (event: SelectChangeEvent<any>) => void;
  sx?: {
    container?: SxProps;
  };
} & SelectProps;

export const SysSelectField: React.FC<ISysSelectField> = ({
  nameField,
  label,
  value,
  options,
  placeholder = `Selecione o ${label}`,
  maxWidth = "1000px",
  error = false,
  msgError = "Algo deu errado, por favor, tente novamente.",
  readOnly = false,
  changeValue,
  sx,
  disabled,
  multiple,
  ...props
}) => {
  const handleChange = (event: SelectChangeEvent<any>) => {
    changeValue(event);
  };

  if (readOnly) {
    const viewValue =
      options && options.find((option) => option.value === value);
    return (
      <Styles.Container sx={sx?.container}>
        <SysViewField
          label={label}
          placeholder={viewValue?.label || "-"}
          sxMap={{ container: { maxWidth: maxWidth } }}
        />
      </Styles.Container>
    );
  }
  return (
    <Styles.Container sx={sx?.container}>
      <SysSimpleLabel
        label={label ?? "Selecione uma opção"}
        disabled={disabled ?? false}
      />
      <Styles.MySelectField
        {...props}
        labelId={`${label}SelectField`}
        id={`${label}SelectField`}
        value={hasValue(value) ? value : ""}
        onChange={handleChange}
        displayEmpty
        disabled={disabled}
        multiple={multiple}
        error={error}
        MenuProps={{
          PaperProps: {
            elevation: 15,
            sx: {
              maxWidth: maxWidth,
            },
          },
          MenuListProps: {
            sx: {
              maxWidth: "100%",
              background: (theme) => theme.palette.common.white,
            },
          },
          disableScrollLock: true,
        }}
        renderValue={(selected) => {
          if (!hasValue(selected)) {
            return (
              <Styles.PlaceHolderText
                className="sys-select-text"
                variant="body1"
                component="span"
                title={placeholder}
              >
                {placeholder}
              </Styles.PlaceHolderText>
            );
          }
          return (
            <Styles.BoxFunctions>
              <Styles.InputSelect
                className="sys-select-text sys-input-text"
                variant="body1"
                component="span"
                title={options?.find((e) => e.value === selected)?.label}
                sx={{
                  maxWidth: maxWidth,
                }}
              >
                {options?.find((e) => e.value === selected)?.label}
              </Styles.InputSelect>
              <Styles.MyIconButton
                size="small"
                disableRipple
                disabled={disabled}
                onClick={(e) => {
                  e.stopPropagation();
                  handleChange({
                    target: { name: nameField, value: "" },
                  } as any);
                }}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <SysSvg paths={HeaderSvgs["close"]} />
              </Styles.MyIconButton>
            </Styles.BoxFunctions>
          );
        }}
      >
        {options?.length === 0 ? (
          <Styles.MyMenuItem id={"NoValues"} disabled value="">
            <ListItemText primary="Nenhuma opção para selecionar" />
          </Styles.MyMenuItem>
        ) : (
          options?.map((option, index) => (
            <Styles.MyMenuItem key={index} value={option.value}>
              <Typography title={option.label} variant="inherit" noWrap>
                {option.label}
              </Typography>
            </Styles.MyMenuItem>
          ))
        )}
      </Styles.MySelectField>
      <Styles.ErrorMessageBody sx={{ maxWidth: maxWidth }}>
        {error && (
          <Styles.ErrorMessageText variant="caption" color="error">
            {msgError}
          </Styles.ErrorMessageText>
        )}
      </Styles.ErrorMessageBody>
    </Styles.Container>
  );
};
