import React from "react";
import styled from "styled-components";
import { Alert } from "react-bootstrap";
import { useMultiStepForm } from "../context/FormContext";
import { useFormValidation } from "../hooks/useFormValidation";
import BasicInfoForm from "../forms/BasicInfoForm";
import ContactInfoForm from "../forms/ContactInfoForm";
import PreferencesForm from "../forms/PreferencesForm";

const StepContainer = styled.div`
  margin-bottom: 30px;
`;

const StepHeader = styled.div`
  margin-bottom: 20px;
`;

const StepTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 10px;
`;

const StepDescription = styled.p`
  color: #666;
  font-size: 1rem;
  margin-bottom: 20px;
`;

const FormContainer = styled.div`
  margin-bottom: 20px;
`;

// Map form IDs to their components
const formComponents = {
  basicInfo: BasicInfoForm,
  contactInfo: ContactInfoForm,
  generalPreferences: (props) => (
    <PreferencesForm formId="generalPreferences" {...props} />
  ),
  advancedSettings: (props) => (
    <PreferencesForm formId="advancedSettings" {...props} />
  ),
};

const FormStep = ({ stepId, stepConfig }) => {
  const { canAccessForm } = useMultiStepForm();
  const { getStepErrors, isStepValid } = useFormValidation(stepId);

  const stepErrors = getStepErrors();
  const hasErrors = Object.keys(stepErrors).length > 0;

  const renderForms = () => {
    return Object.entries(stepConfig.forms).map(([formId, formConfig]) => {
      if (!canAccessForm(formConfig.requiredPrivilege)) {
        return null;
      }

      const FormComponent = formComponents[formId];
      if (!FormComponent) {
        console.warn(`No component found for form ID: ${formId}`);
        return null;
      }

      return (
        <FormContainer key={formId}>
          <FormComponent />
        </FormContainer>
      );
    });
  };

  return (
    <StepContainer>
      <StepHeader>
        <StepTitle>{stepConfig.title}</StepTitle>
        {stepConfig.description && (
          <StepDescription>{stepConfig.description}</StepDescription>
        )}
      </StepHeader>

      {hasErrors && !isStepValid && (
        <Alert variant="danger" className="mb-4">
          Please fix the following errors:
          <ul className="mb-0 mt-2">
            {Object.entries(stepErrors).map(([field, error]) => (
              <li key={field}>{error.message}</li>
            ))}
          </ul>
        </Alert>
      )}

      {renderForms()}
    </StepContainer>
  );
};

export default FormStep;
