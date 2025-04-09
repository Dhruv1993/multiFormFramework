import React from 'react'

const getTextWidth = (text) => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if (context) {
    return context.measureText(text).width + 20 // Add padding
  }
  return text.length * 8 + 20 // Fallback estimate
}

export const extensionColumns = [
  {
    Header: 'Line',
    accessor: 'line',
    width: 50,
  },
  {
    Header: 'Start Date',
    accessor: 'start',
    minWidth: getTextWidth('Start Date'),
  },
  {
    Header: 'Stop Date',
    accessor: 'stop',
    getTextWidth: getTextWidth('Stop Date'),
  },
  {
    Header: 'Term',
    accessor: 'term',
    minWidth: getTextWidth('Term'),
  },
  {
    Header: 'Next Exercise Start',
    accessor: 'exerciseStart',
    minWidth: getTextWidth('Next Exercise Start'),
  },
  {
    Header: 'Next Exercise Stop',
    accessor: 'exerciseStop',
    minWidth: getTextWidth('Next Exercise Stop'),
  },
  {
    Header: 'Start IFRS16',
    accessor: 'isBaselineIFRS16Option',
    minWidth: getTextWidth('Start IFRS16'),
  },
  {
    Header: 'Reasonably Certain',
    accessor: 'isToBeExercised',
    minWidth: getTextWidth('Reasonably Certain'),
  },
  {
    Header: 'Complete',
    accessor: 'isCompleted',
    minWidth: getTextWidth('Complete'),
  },
  {
    Header: 'Details',
    accessor: 'summary',
    minWidth: getTextWidth('Details'),
  },
  {
    Header: 'IFRS16 Recognize From',
    accessor: 'ifrs16RecognitionDate',
    minWidth: getTextWidth('IFRS16 Recognize From'),
  },
  {
    Header: 'Discount Rate Type',
    accessor: 'discRateAppType',
    minWidth: 300,
    width: getTextWidth('Discount Rate Type'),
  },
]
