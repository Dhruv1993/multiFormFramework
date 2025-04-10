import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { Button } from 'react-bootstrap';
import { useMultiStepForm } from '../context/FormContext';
import { useTable, useSortBy } from 'react-table';

const OverviewContainer = styled.div`
  padding: 20px;
`;

const FormSection = styled.div`
  margin-bottom: 30px;
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.12);
  }
`;

const SectionTitle = styled.h3`
  color: #1a365d;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e2e8f0;
  font-weight: 600;
  font-size: 1.5rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 16px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const Th = styled.th`
  background: #f7fafc;
  padding: 16px;
  text-align: left;
  border-bottom: 2px solid #e2e8f0;
  color: #4a5568;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #edf2f7;
  }

  span {
    margin-left: 8px;
    color: #718096;
  }
`;

const Td = styled.td`
  padding: 16px;
  border-bottom: 1px solid #e2e8f0;
  background: white;
  color: #2d3748;
  font-size: 0.95rem;
  transition: background-color 0.2s ease;

  &:first-child {
    font-weight: 500;
    color: #4a5568;
  }
`;

const Tr = styled.tr`
  &:hover td {
    background: #f7fafc;
  }

  &:last-child td {
    border-bottom: none;
  }
`;

const SectionFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
`;

const StyledButton = styled(Button)`
  padding: 8px 20px;
  font-weight: 500;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
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

    // Prepare columns for react-table
    const columns = useMemo(
      () => [
        {
          Header: 'Field',
          accessor: 'field',
        },
        {
          Header: 'Value',
          accessor: 'value',
        },
      ],
      []
    );

    // Prepare data for react-table
    const data = useMemo(
      () =>
        Object.entries(sectionData).map(([key, value]) => ({
          field: key,
          value: value?.toString() || 'Not set',
        })),
      [sectionData]
    );

    // Initialize react-table
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

    return (
      <FormSection key={section.title}>
        <SectionTitle>{section.title}</SectionTitle>
        <Table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' ↓'
                          : ' ↑'
                        : ''}
                    </span>
                  </Th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <Td {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </Td>
                  ))}
                </Tr>
              );
            })}
          </tbody>
        </Table>
        <SectionFooter>
          <StyledButton 
            variant="primary"
            onClick={() => handleOpenStep(section.stepId)}
          >
            Open {section.title} Step
          </StyledButton>
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