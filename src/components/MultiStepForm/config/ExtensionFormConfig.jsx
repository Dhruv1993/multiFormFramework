import React from 'react';
import * as yup from 'yup';
import ExtensionForm from '../forms/ExtensionForm';

const ExtensionFormConfig = ({ defaultValues = {}, visible = true }) => {
  const config = {
    stepId: "extensionForm",
    title: "Extension Form",
    component: <ExtensionForm />,
    schema: yup.object().shape({
      // Add validation schema if needed
      selectedOptions: yup.array(),
      additionalDetails: yup.object()
    }),
    defaultValues: {
      selectedOptions: defaultValues.selectedOptions || [],
      additionalDetails: defaultValues.additionalDetails || {},
    },
    visible,
  };

  return config;
};

export default ExtensionFormConfig;