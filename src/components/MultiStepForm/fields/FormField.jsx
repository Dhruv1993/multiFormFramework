import React from "react";
import { FIELD_TYPES } from "../config/formConfig";
import {
  TextField,
  SelectField,
  CheckboxField,
  RadioField,
  TextareaField,
  DateField,
} from "./index";

const FormField = ({ fieldConfig, name, control }) => {
  const { type, label, placeholder, options, rows, validation, ...rest } =
    fieldConfig;

  switch (type) {
    case FIELD_TYPES.SELECT:
      return (
        <SelectField
          name={name}
          control={control}
          label={label}
          options={options}
          placeholder={placeholder}
          rules={validation}
          {...rest}
        />
      );

    case FIELD_TYPES.RADIO:
      return (
        <RadioField
          name={name}
          control={control}
          label={label}
          options={options}
          rules={validation}
          {...rest}
        />
      );

    case FIELD_TYPES.CHECKBOX:
      return (
        <CheckboxField
          name={name}
          control={control}
          label={label}
          rules={validation}
          {...rest}
        />
      );

    case FIELD_TYPES.TEXTAREA:
      return (
        <TextareaField
          name={name}
          control={control}
          label={label}
          placeholder={placeholder}
          rows={rows}
          rules={validation}
          {...rest}
        />
      );

    case FIELD_TYPES.DATE:
      return (
        <DateField
          name={name}
          control={control}
          label={label}
          rules={validation}
          {...rest}
        />
      );

    default:
      return (
        <TextField
          name={name}
          control={control}
          label={label}
          type={type}
          placeholder={placeholder}
          rules={validation}
          {...rest}
        />
      );
  }
};

export default FormField;
