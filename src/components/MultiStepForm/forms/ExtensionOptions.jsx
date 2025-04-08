import React, { useMemo } from 'react';
import { useTable, useFilters, useSortBy, usePagination, useRowSelect } from 'react-table';
import { TablePageableComponent } from '../components/TablePageableComponent';
import { TableRowSelectable } from '../components/TableComponents';
import PropTypes from 'prop-types';

const defaultTablePageableState = {
  pageIndex: 0,
  pageSize: 10,
  sortBy: [],
  filters: [],
};

const ExtensionOptions = ({ data = [] }) => {
  // Import columns from utils
  const columns = useMemo(
    () => [
      {
        Header: 'Line',
        accessor: 'line',
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
        accessor: 'summary',
      },
      {
        Header: "IFRS16 Recognize From",
        accessor: "ifrs16RecognitionDate",
      },
      {
        Header: "Discount Rate Type",
        accessor: 'discRateAppType',
      }
    ],
    []
  );

  // Use data passed as prop
  const memoData = useMemo(
    () => data.map(item => ({
      ...item,
      isBaselineIFRS16Option: item.isBaselineIFRS16Option ? 'Yes' : 'No',
      isToBeExercised: item.isToBeExercised ? 'Yes' : 'No',
      isCompleted: item.isCompleted ? 'Yes' : 'No',
      discRateAppType: item.discRateAppType === 1 ? 'Fixed' : 
                      item.discRateAppType === 0 ? 'Variable' : 
                      item.discRateAppType === 2 ? 'Mixed' : 'N/A'
    })),
    [data]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    setAllFilters,
    flatRows,
    state: { pageIndex, pageSize, filters, selectedRowIds },
  } = useTable(
    {
      columns,
      data: memoData,
      initialState: {
        ...defaultTablePageableState,
      },
      disableMultiSort: true,
      autoResetPage: false,
    },
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect
  );

  const RowRenderer = ({ row, rowAttributes }) => (
    <TableRowSelectable
      {...{ ...row.getRowProps(), ...rowAttributes }}
      row={row}
    >
      {row.cells.map(cell => (
        <td
          {...cell.getCellProps()}
          style={cell.column.style || {}}
        >
          {cell.render('Cell')}
        </td>
      ))}
    </TableRowSelectable>
  );

  const rowPropsTransform = useMemo(
    () => (row) => ({
      onClick: () => row.toggleRowSelected(),
      'data-testid': 'extension-option-row',
    }),
    []
  );

  return (
    <div>
      <h2>Extension Options</h2>
      <TablePageableComponent
        attributes={{
          'data-testid': 'extension-options-table',
        }}
        hasFilters={filters.length > 0}
        enableFilters={true}
        RowRenderer={RowRenderer}
        rowPropsTransform={rowPropsTransform}
        totalCount={flatRows.length}
        pageCount={pageCount}
        loading={false}
        selectedRowIds={selectedRowIds}
        selectedFlatRows={selectedFlatRows}
        getTableProps={getTableProps}
        getTableBodyProps={getTableBodyProps}
        setAllFilters={setAllFilters}
        prepareRow={prepareRow}
        headerGroups={headerGroups}
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        previousPage={previousPage}
        gotoPage={gotoPage}
        pageSize={pageSize}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        setPageSize={setPageSize}
        nextPage={nextPage}
        page={page}
      />
    </div>
  );
};

export default ExtensionOptions;