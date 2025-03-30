import React from "react";
import { Form } from "react-bootstrap";
import { useController } from "react-hook-form";
import styled from "styled-components";

const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 14px;
  margin-top: 4px;
  display: block;
`;

const CheckboxField = ({ name, control, label, rules = {}, ...rest }) => {
  const {
    field: { value, onChange, ...field },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <Form.Group className="mb-3">
      <Form.Check
        type="checkbox"
        id={name}
        label={label}
        isInvalid={!!error}
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        {...field}
        {...rest}
      />
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </Form.Group>
  );
};

export default CheckboxField;
