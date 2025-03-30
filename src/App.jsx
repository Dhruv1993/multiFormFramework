import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { Alert, Button, Spinner } from "react-bootstrap";
import * as yup from "yup";
import { MultiStepFormProvider } from "./components/MultiStepForm/context/FormContext";
import MultiStepForm from "./components/MultiStepForm/MultiStepForm";
import Form1 from "./components/MultiStepForm/forms/Form1";
import Form2 from "./components/MultiStepForm/forms/Form2";
import Form3 from "./components/MultiStepForm/forms/Form3";

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
        const response = await new Promise((resolve) =>
          setTimeout(() => {
            resolve({
              personalInfo: {
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
                defaultValues: { firstName: "", lastName: "", birthDate: "" },
                visible: true, // Always visible
              },
              contactInfo: {
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
                defaultValues: { email: "", phone: "" },
                visible: true, // Always visible
              },
              adminSettings: {
                stepId: "adminSettings",
                title: "Admin Settings",
                component: <Form3 />,
                schema: yup.object().shape({
                  role: yup.string().required("Role is required"),
                }),
                defaultValues: { role: "" },
                visible: userPrivilege === PRIVILEGE_LEVELS.ADMIN, // Only for admins
              },
            });
          }, 1000)
        );

        // Filter steps based on visibility
        const filteredSteps = {};
        Object.entries(response).forEach(([stepId, stepConfig]) => {
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
  }, [userPrivilege]);

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
