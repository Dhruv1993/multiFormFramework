import React from "react";
import { useFormContext } from "react-hook-form";
import { Form } from "react-bootstrap";
import styled from "styled-components";

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const SelectField = ({ name, label, options, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Select {...register(name)} isInvalid={!!errors[name]} {...props}>
        <option value="">Select an option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Form.Select>
      {errors[name] && <ErrorMessage>{errors[name].message}</ErrorMessage>}
    </Form.Group>
  );
};

export default SelectField;
