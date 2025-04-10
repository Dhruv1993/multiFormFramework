import React from 'react';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { Button } from 'react-bootstrap';
import { useMultiStepForm } from '../context/FormContext';

const OverviewContainer = styled.div`
  padding: 20px;
`;

const FormSection = styled.div`
  margin-bottom: 30px;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const SectionTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e9ecef;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

const Th = styled.th`
  background: #e9ecef;
  padding: 12px;
  text-align: left;
  border: 1px solid #dee2e6;
`;

const Td = styled.td`
  padding: 12px;
  border: 1px solid #dee2e6;
  background: white;
`;

const SectionFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #e9ecef;
`;

const FormOverview = ({ formSections }) => {
  const { getValues } = useFormContext();
  const { goToStep } = useMultiStepForm();
  const formData = getValues();

  const handleOpenStep = (stepId) => {
    goToStep(stepId);
  };

  const renderFormData = (section) => {
    const sectionData = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (section.fields.includes(key)) {
        sectionData[key] = value;
      }
    });

    return (
      <FormSection key={section.title}>
        <SectionTitle>{section.title}</SectionTitle>
        <Table>
          <thead>
            <tr>
              <Th>Field</Th>
              <Th>Value</Th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(sectionData).map(([key, value]) => (
              <tr key={key}>
                <Td>{key}</Td>
                <Td>{value?.toString() || 'Not set'}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
        <SectionFooter>
          <Button 
            variant="primary"
            onClick={() => handleOpenStep(section.stepId)}
          >
            Open {section.title} Step
          </Button>
        </SectionFooter>
      </FormSection>
    );
  };

  return (
    <OverviewContainer>
      <h2>Form Overview</h2>
      {formSections.map(section => renderFormData(section))}
    </OverviewContainer>
  );
};

export default FormOverview; 