import styled from 'styled-components';

export const ProgressContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ProgressItemContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const ProgressTitle = styled.div`
  margin-right: 15px;
  color: #333;
  font-size: 14px;
  font-weight: 600;
  min-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ProgressBarWrapper = styled.div`
  flex-grow: 1;
  margin-right: 15px;
`;

export const ProgressDetails = styled.div`
  display: flex;
  font-size: 12px;
  color: #666;
  min-width: 200px;
`;