import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { Alert, Button, Spinner } from "react-bootstrap";
import * as yup from "yup";
import { MultiStepFormProvider } from "./components/MultiStepForm/context/FormContext";
import MultiStepForm from "./components/MultiStepForm/MultiStepForm";
import PersonalInfoConfig from './components/MultiStepForm/config/PersonalInfoConfig';
import ContactInfoConfig from './components/MultiStepForm/config/ContactInfoConfig';
import AdminSettingsConfig from './components/MultiStepForm/config/AdminSettingsConfig';
import ExtensionFormConfig from './components/MultiStepForm/config/ExtensionFormConfig';
import FormOverviewConfig from './components/MultiStepForm/config/FormOverviewConfig';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 40px 20px;
`;

const Header = styled.h1`
  text-align: center;
  margin-bottom: 40px;
  color: #2c3e50;
`;

const DemoControls = styled.div`
  max-width: 800px;
  margin: 0 auto 20px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SubmissionResult = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  pre {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 4px;
    overflow-x: auto;
  }
`;

function App() {
  const [userPrivilege, setUserPrivilege] = useState("admin");
  const [isEditMode, setIsEditMode] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [formSteps, setFormSteps] = useState(null);
  const [loading, setLoading] = useState(true);

  const PRIVILEGE_LEVELS = {
    BASIC: "basic",
    MANAGER: "manager",
    ADMIN: "admin",
  };

  useEffect(() => {
    const fetchFormConfig = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Create array of configs
        const configs = [
          PersonalInfoConfig({ 
            defaultValues: { 
              firstName: 'John', 
              lastName: 'Doe',
            } 
          }),
          ContactInfoConfig({}),
          AdminSettingsConfig({ userPrivilege }),
          ExtensionFormConfig({
            defaultValues: {
              selectedOptions: [],
              additionalDetails: {}
            }
          }),
          FormOverviewConfig({ isEditMode, userPrivilege }),
        ]

        // Convert array to object using stepId as key
        const formConfig = configs.reduce((acc, config) => {
          acc[config.stepId] = config;
          return acc;
        }, {});

        // Filter steps based on visibility
        const filteredSteps = {};
        Object.entries(formConfig).forEach(([stepId, stepConfig]) => {
          if (stepConfig.visible) {
            filteredSteps[stepId] = stepConfig;
          }
        });
        
        setFormSteps(filteredSteps);
      } catch (error) {
        console.error("Failed to fetch form config:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFormConfig();
  }, [userPrivilege, isEditMode]);

  const handlePrivilegeChange = (privilege) => {
    setUserPrivilege(privilege);
    setSubmittedData(null);
    setSubmitError(null);
  };

  const handleFormSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmittedData(data);
      setSubmitError(null);
      return true;
    } catch (error) {
      setSubmitError("Failed to submit form. Please try again.");
      return false;
    }
  };

  if (loading) {
    return (
      <AppContainer>
        <Spinner animation="border" />
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <Header>Multi-Step Form Demo</Header>

      <DemoControls>
        <h5>User Privilege Level</h5>
        <div className="d-flex gap-2 mb-3">
          {Object.entries(PRIVILEGE_LEVELS).map(([key, value]) => (
            <Button
              key={key}
              variant={userPrivilege === value ? "primary" : "outline-primary"}
              onClick={() => handlePrivilegeChange(value)}
            >
              {key}
            </Button>
          ))}
        </div>
        <small className="text-muted">
          Change privilege level to see different form steps
        </small>

        <h5 className="mt-4">Edit Mode</h5>
        <Button
          variant={isEditMode ? "primary" : "outline-primary"}
          onClick={() => setIsEditMode(!isEditMode)}
        >
          {isEditMode ? "Exit Edit Mode" : "Enter Edit Mode"}
        </Button>
      </DemoControls>

      <MultiStepFormProvider
        formSteps={formSteps}
        onSubmit={handleFormSubmit}
        initialStep={0}
      >
        <MultiStepForm />
      </MultiStepFormProvider>

      {submitError && (
        <Alert variant="danger" className="mt-4">
          {submitError}
        </Alert>
      )}

      {submittedData && (
        <SubmissionResult>
          <h4>Submitted Form Data:</h4>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </SubmissionResult>
      )}
    </AppContainer>
  );
}

export default App;
