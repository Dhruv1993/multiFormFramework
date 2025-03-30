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

const RadioGroup = styled.div`
  margin-bottom: 1rem;
`;

const RadioField = ({
  name,
  control,
  label,
  options = [],
  rules = {},
  ...rest
}) => {
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
      {label && <Form.Label>{label}</Form.Label>}
      <RadioGroup>
        {options.map((option, index) => (
          <Form.Check
            key={option.value}
            type="radio"
            id={`${name}-${index}`}
            label={option.label}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            isInvalid={!!error}
            {...field}
            {...rest}
          />
        ))}
      </RadioGroup>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </Form.Group>
  );
};

export default RadioField;
