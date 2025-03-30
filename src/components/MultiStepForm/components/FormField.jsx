import React, { useState, useCallback } from "react";
import { useFormContext, useController } from "react-hook-form";
import styled from "styled-components";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useFormField } from "../context/FormContext";

const FieldWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled(Form.Label)`
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: ${(props) => (props.error ? "#dc3545" : "#212529")};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  ${(props) =>
    props.required &&
    `
    &::after {
      content: '*';
      color: #dc3545;
      margin-left: 4px;
    }
  `}
`;

const HelpText = styled.small`
  display: block;
  margin-top: 0.25rem;
  color: ${(props) => (props.error ? "#dc3545" : "#6c757d")};
`;

const ValidationIcon = styled.span`
  position: absolute;
  right: ${(props) => (props.hasAction ? "40px" : "10px")};
  top: 50%;
  transform: translateY(-50%);
  color: ${(props) => (props.isValid ? "#28a745" : "#dc3545")};
  cursor: help;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const ActionButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #6c757d;

  &:hover {
    color: #495057;
  }
`;

const InfoIcon = styled.span`
  color: #17a2b8;
  cursor: help;
  font-size: 0.875rem;
`;

const FormField = ({
  name,
  label,
  helpText,
  infoText,
  required = false,
  showValidation = true,
  children,
  rules = {},
  transform,
  validate,
  action,
  actionIcon,
  onAction,
  ...props
}) => {
  const {
    formState: { touchedFields, dirtyFields },
  } = useFormContext();
  const fieldStatus = useFormField(name);
  const [isDirty, setIsDirty] = useState(false);

  const {
    field,
    fieldState: { error, invalid },
  } = useController({
    name,
    rules: {
      ...rules,
      required: required ? "This field is required" : false,
      validate: validate
        ? {
            ...rules.validate,
            customValidation: validate,
          }
        : rules.validate,
    },
  });

  const showError =
    error && (touchedFields[name] || dirtyFields[name] || isDirty);
  const showSuccess =
    !invalid &&
    (touchedFields[name] || dirtyFields[name] || isDirty) &&
    showValidation;

  const handleChange = useCallback(
    (e) => {
      setIsDirty(true);
      let value = e.target.value;

      if (transform) {
        value = transform(value);
      }

      field.onChange(value);
    },
    [field, transform]
  );

  const renderValidationIcon = () => {
    if (!showValidation || (!showError && !showSuccess)) return null;

    return (
      <OverlayTrigger
        placement="left"
        overlay={
          <Tooltip>{showError ? error.message : "Field is valid"}</Tooltip>
        }
      >
        <ValidationIcon isValid={!invalid} hasAction={!!action}>
          {showSuccess ? "✓" : "✗"}
        </ValidationIcon>
      </OverlayTrigger>
    );
  };

  const renderHelpText = () => {
    if (showError) {
      return <HelpText error>{error.message}</HelpText>;
    }
    if (helpText) {
      return <HelpText>{helpText}</HelpText>;
    }
    return null;
  };

  const renderActionButton = () => {
    if (!action) return null;

    return (
      <ActionButton type="button" onClick={onAction} aria-label={action}>
        {actionIcon}
      </ActionButton>
    );
  };

  // Clone the child component and pass necessary props
  const childComponent = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...field,
        onChange: handleChange,
        ...props,
        isInvalid: showError,
        isValid: showSuccess,
        "aria-invalid": invalid,
        "aria-describedby": `${name}-help`,
      });
    }
    return child;
  });

  return (
    <FieldWrapper>
      {label && (
        <Label htmlFor={name} error={showError} required={required}>
          {label}
          {infoText && (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>{infoText}</Tooltip>}
            >
              <InfoIcon>ⓘ</InfoIcon>
            </OverlayTrigger>
          )}
        </Label>
      )}

      <InputWrapper>
        {childComponent}
        {renderValidationIcon()}
        {renderActionButton()}
      </InputWrapper>

      {renderHelpText()}
    </FieldWrapper>
  );
};

export default FormField;
