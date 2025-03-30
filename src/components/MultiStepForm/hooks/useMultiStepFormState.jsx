import { useState, useCallback, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useMultiStepForm } from "../context/FormContext";

export const useMultiStepFormState = (initialStep = 0) => {
  const { reset, getValues } = useFormContext();
  const { formSteps } = useMultiStepForm();
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [stepHistory, setStepHistory] = useState([initialStep]);

  const steps = useMemo(() => Object.entries(formSteps || {}), [formSteps]);
  const stepIds = useMemo(() => steps.map(([id]) => id), [steps]);
  const currentStepId = steps[currentStep]?.[0];

  const nextStep = useCallback(async () => {
    console.log(
      "nextStep called. currentStep:",
      currentStep,
      "steps.length:",
      steps.length
    );
    if (currentStep < steps.length - 1) {
      const nextStepIndex = currentStep + 1;
      setCurrentStep(nextStepIndex);
      setStepHistory((prev) => [...prev, nextStepIndex]);
      console.log("Moving to step:", nextStepIndex);
      return true;
    }
    console.log("Cannot move to next step.");
    return false;
  }, [currentStep, steps.length]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      const prevStepIndex = currentStep - 1;
      setCurrentStep(prevStepIndex);
      setStepHistory((prev) => [...prev.slice(0, -1)]);
      return true;
    }
    return false;
  }, [currentStep]);

  const goToStep = useCallback(
    async (stepIndex) => {
      if (stepIndex >= 0 && stepIndex < steps.length) {
        setCurrentStep(stepIndex);
        setStepHistory((prev) =>
          stepIndex < currentStep
            ? prev.slice(0, stepIndex + 1)
            : [...prev, stepIndex]
        );
        return true;
      }
      return false;
    },
    [currentStep, steps.length]
  );

  const getAllFormData = useCallback(() => getValues(), [getValues]);

  const resetForm = useCallback(
    (defaultValues = {}) => {
      reset(defaultValues);
      setCurrentStep(initialStep);
      setStepHistory([initialStep]);
    },
    [reset, initialStep]
  );

  const progress = useMemo(() => {
    return ((currentStep + 1) / steps.length) * 100;
  }, [currentStep, steps.length]);

  return {
    currentStep,
    currentStepId,
    currentStepConfig: steps[currentStep]?.[1],
    totalSteps: steps.length,
    stepHistory,
    progress,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps.length - 1,
    getAllFormData,
    nextStep,
    prevStep,
    goToStep,
    resetForm,
  };
};
