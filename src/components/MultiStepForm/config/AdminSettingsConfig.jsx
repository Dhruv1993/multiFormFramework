import React from 'react';
import * as yup from 'yup';
import Form3 from '../forms/Form3';

const AdminSettingsConfig = ({ defaultValues = {}, userPrivilege = '', visible }) => {
  const config = {
    stepId: "adminSettings",
    title: "Admin Settings",
    component: <Form3 />,
    schema: yup.object().shape({
      role: yup.string().required("Role is required"),
    }),
    defaultValues: {
      role: defaultValues.role || "",
    },
    // If visible prop is explicitly provided, use it; otherwise, check userPrivilege
    visible: visible !== undefined ? visible : userPrivilege === "admin",
  };

  return config;
};

export default AdminSettingsConfig;