const columns = [
  {
    Header: 'Line',
    accessor: 'line', // Maps to the data property
  },
  {
    Header: 'Start Date',
    accessor: 'start',
  },
  {
    Header: 'Stop Date',
    accessor: 'stop',
  },
  {
    Header: 'Term',
    accessor: 'term',
  },
  {
    Header: 'Next Exercise Start',
    accessor: 'exerciseStart',
  },
  {
    Header: 'Next Exercise Stop',
    accessor: 'exerciseStop',
  },
  {
    Header: 'Start IFRS16',
    accessor: 'isBaselineIFRS16Option',
  },
  {
    Header: 'Reasonably Certain',
    accessor: 'isToBeExercised',
  },
  {
    Header: 'Complete',
    accessor: 'isCompleted',
  },
  {
    Header: 'Details',
    accessor: 'summary'
  },
  {
    Header: "IFRS16 Recognize From",
    accessor: "ifrs16RecognitionDate"
  },
  {
    Header: "Discount Rate Type",
    accessor: 'discRateAppType'
  }
];