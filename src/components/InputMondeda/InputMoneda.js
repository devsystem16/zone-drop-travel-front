import * as React from "react";
import PropTypes from "prop-types";
import { IMaskInput } from "react-imask";
import NumberFormat from "react-number-format";

import TextField from "@mui/material/TextField";

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(#00) 000-0000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function InputMoneda({ label, name, setValue, width = "140px" }) {
  const [values, setValues] = React.useState({
    name: "0",
  });

  const handleChange = (event) => {
    setValue(event);
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  return (
    <TextField
      label={label}
      style={{ width: width }}
      value={values.numberformat}
      onChange={handleChange}
      name={name}
      id="formatted-numberformat-input"
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
      variant="standard"
    />
  );
}
