import React from 'react';
import * as yup from 'yup';
import Form2 from '../forms/Form2';

const ContactInfoConfig = ({ defaultValues = {}, visible = true }) => {
  const config = {
    stepId: "contactInfo",
    title: "Contact Information",
    component: <Form2 />,
    schema: yup.object().shape({
      email: yup
        .string()
        .email("Invalid email")
        .required("Email is required"),
      phone: yup
        .string()
        .matches(/^\d{10}$/, "Phone must be 10 digits")
        .required("Phone is required"),
    }),
    defaultValues: {
      email: defaultValues.email || "",
      phone: defaultValues.phone || "",
    },
    visible,
  };

  return config;
};

export default ContactInfoConfig;