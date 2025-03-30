import React from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "react-bootstrap";
import { useMultiStepFormState } from "./hooks/useMultiStepFormState";
import { useMultiStepForm } from "./context/FormContext";
import styled from "styled-components";
import * as yup from "yup";

const FormWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MultiStepForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
  } = useFormContext();
  const { formSteps, onSubmit, initialStep } = useMultiStepForm();
  const {
    currentStep,
    currentStepConfig,
    totalSteps,
    nextStep,
    prevStep,
    isFirstStep,
    isLastStep,
    progress,
  } = useMultiStepFormState(initialStep);

  const handleFormSubmit = async (data) => {
    console.log("handleFormSubmit called with data:", data);
    if (isLastStep) {
      // Validate all steps on final submission
      const allSchemas = {};
      Object.values(formSteps).forEach((step) => {
        Object.assign(allSchemas, step.schema.fields);
      });
      const fullSchema = yup.object().shape(allSchemas);
      try {
        await fullSchema.validate(data, { abortEarly: false });
        console.log("Submitting form:", data);
        return onSubmit(data);
      } catch (validationErrors) {
        console.log("Final validation errors:", validationErrors.errors);
        validationErrors.inner.forEach((error) => {
          setError(error.path, { type: "manual", message: error.message });
        });
        return false;
      }
    } else {
      // Validate current step before proceeding
      const currentSchema = currentStepConfig.schema;
      try {
        await currentSchema.validate(data, { abortEarly: false });
        console.log(
          "Current step valid, moving to next step from:",
          currentStep
        );
        const result = await nextStep();
        console.log("nextStep result:", result);
        if (result) {
          clearErrors(); // Clear errors when moving forward
        }
        return result;
      } catch (validationErrors) {
        console.log("Current step validation errors:", validationErrors.errors);
        validationErrors.inner.forEach((error) => {
          setError(error.path, { type: "manual", message: error.message });
        });
        return false;
      }
    }
  };

  const onSubmitError = (errors) => {
    console.log("Form validation errors:", errors);
  };

  const isStepVisible = currentStepConfig.visible !== false;

  if (!isStepVisible) {
    return (
      <FormWrapper>
        <h5>
          Step {currentStep + 1}: {currentStepConfig.title}
        </h5>
        <p>You do not have permission to view this step.</p>
        <div className="d-flex justify-content-between mt-3">
          <Button variant="secondary" disabled={isFirstStep} onClick={prevStep}>
            Previous
          </Button>
          <Button variant="primary" onClick={nextStep}>
            Next
          </Button>
        </div>
      </FormWrapper>
    );
  }

  return (
    <FormWrapper>
      <h5>
        Step {currentStep + 1} of {totalSteps}: {currentStepConfig.title}
      </h5>
      <div className="progress mb-3">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit, onSubmitError)}>
        {currentStepConfig.component}
        {Object.keys(errors).length > 0 && (
          <p style={{ color: "#dc3545" }}>
            Please fix the errors before proceeding.
          </p>
        )}
        <div className="d-flex justify-content-between mt-3">
          <Button variant="secondary" disabled={isFirstStep} onClick={prevStep}>
            Previous
          </Button>
          <Button type="submit" variant="primary">
            {isLastStep ? "Submit" : "Next"}
          </Button>
        </div>
      </form>
    </FormWrapper>
  );
};

export default MultiStepForm;
