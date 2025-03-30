import React from "react";
import { useFormContext } from "react-hook-form";
import { Form } from "react-bootstrap";
import styled from "styled-components";

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const DateField = ({ name, label, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="date"
        {...register(name)}
        isInvalid={!!errors[name]}
        {...props}
      />
      {errors[name] && <ErrorMessage>{errors[name].message}</ErrorMessage>}
    </Form.Group>
  );
};

export default DateField;
