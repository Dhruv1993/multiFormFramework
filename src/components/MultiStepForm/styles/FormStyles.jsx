import styled from "styled-components";

export const FormSection = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

export const FormTitle = styled.h3`
  margin-bottom: 20px;
  color: #333;
  font-weight: 600;
`;

export const FormDescription = styled.p`
  color: #666;
  margin-bottom: 20px;
  font-size: 0.9rem;
`;

export const FormWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const StepNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 20px 0;
  border-top: 1px solid #eee;
`;

export const StepTitle = styled.h2`
  margin-bottom: 20px;
  color: #2c3e50;
  font-weight: 700;
`;

export const StepDescription = styled.p`
  color: #666;
  margin-bottom: 30px;
  font-size: 1rem;
`;

export const FormContainer = styled.div`
  margin-bottom: 30px;
`;

export const StepIndicatorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
  padding: 20px 0;
`;

export const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  max-width: 600px;
  margin: 0 auto;
`;

export const StepDot = styled.div`
  width: ${(props) => (props.active ? "16px" : "12px")};
  height: ${(props) => (props.active ? "16px" : "12px")};
  border-radius: 50%;
  background-color: ${(props) =>
    props.active ? "#007bff" : props.completed ? "#28a745" : "#dee2e6"};
  margin: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;

  &:hover {
    transform: scale(1.2);
  }

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: ${(props) => (props.completed ? "#28a745" : "#dee2e6")};
    left: 50%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }

  &:last-child::after {
    display: none;
  }
`;

export const StepLabel = styled.div`
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.875rem;
  color: ${(props) =>
    props.active ? "#007bff" : props.completed ? "#28a745" : "#6c757d"};
  white-space: nowrap;
  font-weight: ${(props) => (props.active ? "600" : "400")};
`;

export const ErrorContainer = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 4px;
  background-color: #fff3f3;
  border: 1px solid #dc3545;
`;

export const ProgressContainer = styled.div`
  margin-bottom: 40px;
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
`;

export const ValidationMessage = styled.div`
  color: ${(props) => (props.type === "error" ? "#dc3545" : "#28a745")};
  font-size: 0.875rem;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`;

export const FieldLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #495057;
  font-weight: 500;

  ${(props) =>
    props.required &&
    `
    &::after {
      content: '*';
      color: #dc3545;
      margin-left: 4px;
    }
  `}
`;

export const FieldHint = styled.small`
  display: block;
  margin-top: 0.25rem;
  color: #6c757d;
`;

export const FieldError = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

export const FormCard = styled(FormSection)`
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;
