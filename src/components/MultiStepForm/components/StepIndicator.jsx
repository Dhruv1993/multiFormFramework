import React from "react";
import styled from "styled-components";
import { useFormValidation } from "../hooks/useFormValidation";

const StepIndicatorWrapper = styled.div`
  margin: 40px 0;
  position: relative;
`;

const StepperContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: #e9ecef;
    z-index: 1;
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  height: 2px;
  background: #007bff;
  transition: width 0.3s ease;
  z-index: 2;
  width: ${(props) => props.progress}%;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 3;
  cursor: ${(props) => (props.clickable ? "pointer" : "default")};

  &:hover {
    transform: ${(props) => (props.clickable ? "translateY(-2px)" : "none")};
  }
`;

const StepNumber = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${(props) =>
    props.active ? "#007bff" : props.completed ? "#28a745" : "#e9ecef"};
  color: ${(props) => (props.active || props.completed ? "#fff" : "#6c757d")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-bottom: 8px;
  border: 2px solid
    ${(props) =>
      props.active ? "#007bff" : props.completed ? "#28a745" : "#e9ecef"};
`;

const StepLabel = styled.div`
  font-size: 0.875rem;
  color: ${(props) =>
    props.active ? "#007bff" : props.completed ? "#28a745" : "#6c757d"};
  text-align: center;
  max-width: 120px;
  transition: all 0.3s ease;
  font-weight: ${(props) => (props.active ? "600" : "400")};
`;

const StepStatus = styled.div`
  font-size: 0.75rem;
  color: ${(props) =>
    props.isValid ? "#28a745" : props.hasError ? "#dc3545" : "#6c757d"};
  margin-top: 4px;
`;

const StepIndicator = ({
  currentStep,
  totalSteps,
  progress,
  goToStep,
  currentStepId,
  steps,
}) => {
  const { isStepValid, isStepComplete } = useFormValidation(currentStepId);

  const renderStep = (stepIndex) => {
    const [stepId, stepConfig] = Object.entries(steps)[stepIndex];

    const isActive = currentStep === stepIndex;
    const isCompleted = stepIndex < currentStep;
    const canClick = stepIndex <= currentStep;

    const handleClick = () => {
      if (canClick) {
        goToStep(stepIndex);
      }
    };

    return (
      <Step key={stepId} onClick={handleClick} clickable={canClick}>
        <StepNumber active={isActive} completed={isCompleted}>
          {stepIndex + 1}
        </StepNumber>
        <StepLabel active={isActive} completed={isCompleted}>
          {stepConfig.title}
        </StepLabel>
        {isActive && (
          <StepStatus
            isValid={isStepValid}
            hasError={!isStepValid && isStepComplete}
          >
            {!isStepValid && isStepComplete
              ? "Has errors"
              : isStepValid
              ? "Valid"
              : "In progress"}
          </StepStatus>
        )}
      </Step>
    );
  };

  return (
    <StepIndicatorWrapper>
      <StepperContainer>
        <ProgressBar progress={progress} />
        {Object.keys(steps).map((_, index) => renderStep(index))}
      </StepperContainer>
    </StepIndicatorWrapper>
  );
};

export default StepIndicator;
