import React, { ChangeEvent } from "react";
import { Box, FormControl, FormLabel, RadioProps } from "@mui/material";
import Styles from "./SysRadioFieldStyles";
import { SysSimpleLabel } from "../sysSimpleLabel/SysSimpleLabel";
import sysSizing from "../../../sysMaterialUi/sizing/sysSizes";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckIcon from "@mui/icons-material/Check";
import { SysViewField } from "../sysViewField/SysViewField";

export type IOptionToSysRadioField = {
  value: string;
  label: string;
};

interface ISysRadioField extends RadioProps {
  label: string;
  value: string;
  readOnly?: boolean;
  options: IOptionToSysRadioField[];
  maxWidth?: string;
  useCheckedIcon?: boolean;
  changeValue: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const SysRadioField: React.FC<ISysRadioField> = ({
  label,
  value,
  readOnly = false,
  options,
  maxWidth = "1000px",
  useCheckedIcon = false,
  changeValue,
  ...props
}) => {
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    changeValue(event);
  }

  if (readOnly) {
    const viewValue =
      options && options.find((option) => option.value === value);
    return (
      <Styles.Container>
        <SysViewField label={label} placeholder={viewValue?.label || "-"} />
      </Styles.Container>
    );
  }

  return (
    <FormControl
      sx={{
        width: "100%",
        maxWidth: maxWidth,
        padding: sysSizing.base.baseFixed075,
      }}
    >
      <FormLabel id={`radio-buttons-group-${props.name}`}>
        <SysSimpleLabel
          label={label ?? "Escolha uma das opções"}
          disabled={props.disabled ?? false}
        />
      </FormLabel>
      <Styles.Container
        aria-labelledby={`radio-buttons-group-${props.name}`}
        name={`controlled-radio-buttons-group-${props.name}`}
        value={value}
        onChange={onChange}
      >
        {options.map((item, index) => (
          <Styles.MyFormControlLabel
            key={`keyRadioInput${index}`}
            disabled={props.disabled ?? false}
            value={item.value}
            control={
              <Styles.MyRadio
                {...props}
                checkedIcon={
                  useCheckedIcon ? (
                    <CheckIcon fontSize="small" sx={{ borderRadius: "3px" }} />
                  ) : (
                    <RadioButtonCheckedIcon sx={{ borderRadius: "50%" }} />
                  )
                }
                icon={
                  useCheckedIcon ? (
                    <Box
                      sx={{
                        borderRadius: "3px",
                        border: (theme) =>
                          `2px solid ${theme.palette.secondary.main}`,
                        height: "20px",
                        width: "20px",
                      }}
                    />
                  ) : (
                    <RadioButtonUncheckedIcon sx={{ borderRadius: "50%" }} />
                  )
                }
              />
            }
            label={item.label}
          />
        ))}
      </Styles.Container>
    </FormControl>
  );
};
