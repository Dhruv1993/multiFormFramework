import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { formConfig } from "../config/formConfig.js";
import {
  createFormValidationSchema,
  transformFormData,
} from "../utils/formUtils.js";

export const useFormValidation = (stepIds) => {
  const {
    trigger,
    formState: { errors, dirtyFields, touchedFields },
    getValues,
    watch,
  } = useFormContext();

  const normalizedStepIds = useMemo(
    () => (Array.isArray(stepIds) ? stepIds : [stepIds]),
    [stepIds]
  );

  const allStepFields = useMemo(() => {
    return normalizedStepIds.reduce((acc, stepId) => {
      const stepConfig = formConfig[stepId];
      if (!stepConfig?.forms) return acc;

      const fields = {};
      Object.values(stepConfig.forms).forEach((form) => {
        Object.entries(form.fields).forEach(([fieldName, fieldConfig]) => {
          fields[fieldName] = fieldConfig;
        });
      });
      acc[stepId] = fields;
      return acc;
    }, {});
  }, [normalizedStepIds]);

  const stepValidationSchemas = useMemo(() => {
    return Object.fromEntries(
      Object.entries(allStepFields).map(([stepId, fields]) => [
        stepId,
        createFormValidationSchema(fields),
      ])
    );
  }, [allStepFields]);

  const allFields = useMemo(
    () => Object.values(allStepFields).flatMap((fields) => Object.keys(fields)),
    [allStepFields]
  );
  const watchedFields = watch(allFields);

  useEffect(() => {
    const validateSteps = async () => {
      const fieldsToValidate = allFields.filter(
        (field) => dirtyFields[field] || touchedFields[field]
      );
      if (fieldsToValidate.length > 0) {
        await trigger(fieldsToValidate);
      }
    };
    validateSteps();
  }, [watchedFields, allFields, trigger, dirtyFields, touchedFields]);

  const validations = useMemo(() => {
    return normalizedStepIds.map((stepId) => {
      const currentStepFields = allStepFields[stepId] || {};

      const isStepValid = Object.keys(currentStepFields).every(
        (field) => !errors[field]
      );

      const getStepData = () => {
        const stepFields = Object.keys(currentStepFields);
        const stepData = {};
        stepFields.forEach((field) => {
          stepData[field] = getValues(field);
        });
        return transformFormData(stepData, currentStepFields);
      };

      const isStepComplete = Object.entries(currentStepFields)
        .filter(([_, config]) => config.required)
        .map(([fieldName]) => fieldName)
        .every((field) => {
          const value = getValues(field);
          return value !== undefined && value !== "" && !errors[field];
        });

      const getStepErrors = () => {
        const stepFields = Object.keys(currentStepFields);
        const stepErrors = {};
        stepFields.forEach((field) => {
          if (errors[field]) {
            stepErrors[field] = errors[field];
          }
        });
        return stepErrors;
      };

      const getFieldStatus = (fieldName) => ({
        isDirty: !!dirtyFields[fieldName],
        isTouched: !!touchedFields[fieldName],
        hasError: !!errors[fieldName],
        errorMessage: errors[fieldName]?.message,
      });

      return {
        isStepValid,
        isStepComplete,
        getStepData,
        getStepErrors,
        getFieldStatus,
        stepValidationSchema: stepValidationSchemas[stepId],
        currentStepFields,
        errors: Object.fromEntries(
          Object.keys(currentStepFields)
            .filter((field) => errors[field])
            .map((field) => [field, errors[field]])
        ),
      };
    });
  }, [
    normalizedStepIds,
    allStepFields,
    stepValidationSchemas,
    errors,
    dirtyFields,
    touchedFields,
    getValues,
  ]);

  return Array.isArray(stepIds) ? validations : validations[0];
};
