import styled from 'styled-components'

export const ProgressContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  width: 100%;
  padding: 15px;
  border-radius: 8px;
`  

export const ProgressItemContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
`  

export const ProgressTitle = styled.div`
  margin-right: 15px;
  color: #333;
  font-size: 14px;
  font-weight: 600;
  min-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
` 

export const ProgressBarWrapper = styled.div`
  flex-grow: 1;
  margin-right: 15px;
`  

export const ProgressDetails = styled.div`
  display: flex;
  font-size: 12px;
  color: #666;
  min-width: 200px;
` 
