import React, { createContext, useContext, useMemo, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const FormContext = createContext();

export const MultiStepFormProvider = ({
  children,
  formSteps,
  onSubmit,
  initialStep = 0,
}) => {
  const defaultValues = useMemo(() => {
    const defaults = {};
    Object.values(formSteps || {}).forEach((stepConfig) => {
      Object.assign(defaults, stepConfig.defaultValues);
    });
    return defaults;
  }, [formSteps]);

  const steps = useMemo(() => Object.entries(formSteps || {}), [formSteps]);

  const methods = useForm({
    mode: "onChange",
    defaultValues,
  });

  const value = {
    formSteps,
    onSubmit,
    initialStep,
    steps, // Pass steps to children
  };

  return (
    <FormContext.Provider value={value}>
      <FormProvider {...methods}>{children}</FormProvider>
    </FormContext.Provider>
  );
};

export const useMultiStepForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error(
      "useMultiStepForm must be used within a MultiStepFormProvider"
    );
  }
  return context;
};
