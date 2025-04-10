import React from 'react';
import FormOverview from '../forms/FormOverview';
import PersonalInfoConfig from './PersonalInfoConfig';
import ContactInfoConfig from './ContactInfoConfig';
import AdminSettingsConfig from './AdminSettingsConfig';
import ExtensionFormConfig from './ExtensionFormConfig';

const FormOverviewConfig = ({ defaultValues = {}, visible = true, isEditMode = false, userPrivilege = 'admin' }) => {
  // Get configurations from actual form configs
  const personalInfo = PersonalInfoConfig({ defaultValues });
  const contactInfo = ContactInfoConfig({ defaultValues });
  const adminSettings = AdminSettingsConfig({ userPrivilege });
  const extensionForm = ExtensionFormConfig({ defaultValues });

  // Create form sections from actual configs
  const formSections = [
    {
      title: personalInfo.title,
      stepId: personalInfo.stepId,
      fields: Object.keys(personalInfo.defaultValues)
    },
    {
      title: contactInfo.title,
      stepId: contactInfo.stepId,
      fields: Object.keys(contactInfo.defaultValues)
    },
    {
      title: adminSettings.title,
      stepId: adminSettings.stepId,
      fields: Object.keys(adminSettings.defaultValues)
    },
    {
      title: extensionForm.title,
      stepId: extensionForm.stepId,
      fields: Object.keys(extensionForm.defaultValues)
    }
  ].filter(section => section.fields.length > 0); // Only include sections with fields

  const config = {
    stepId: "formOverview",
    title: "Form Overview",
    component: <FormOverview formSections={formSections} />,
    schema: {}, // No validation needed for overview
    defaultValues: {},
    visible: visible && isEditMode, // Only visible in edit mode
  };

  return config;
};

export default FormOverviewConfig; 