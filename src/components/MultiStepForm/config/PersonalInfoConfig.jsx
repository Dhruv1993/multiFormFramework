import React from 'react';
import * as yup from 'yup';
import Form1 from '../forms/Form1';

const PersonalInfoConfig = ({ defaultValues = {}, visible = true }) => {
  const config = {
    stepId: "personalInfo",
    title: "Personal Information",
    component: <Form1 />,
    schema: yup.object().shape({
      firstName: yup.string().required("First Name is required"),
      lastName: yup.string().required("Last Name is required"),
      birthDate: yup
        .date()
        .required("Birth Date is required")
        .typeError("Invalid date"),
    }),
    defaultValues: {
      firstName: defaultValues.firstName || "",
      lastName: defaultValues.lastName || "",
      birthDate: defaultValues.birthDate || "",
    },
    visible,
  };

  return config;
};

export default PersonalInfoConfig;