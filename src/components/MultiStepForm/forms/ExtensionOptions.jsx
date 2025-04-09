import React, { useMemo } from 'react';
import { useTable, useFilters, useSortBy, usePagination, useRowSelect, useResizeColumns } from 'react-table';
import { TablePageableComponent } from '../components/TablePageableComponent';
import { TableRowSelectable } from '../components/TableComponents';
import styled from 'styled-components';

const defaultTablePageableState = {
  pageIndex: 0,
  pageSize: 10,
  sortBy: [],
  filters: [],
};

const StyledCell = styled.div`
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ResizeHandle = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 5px;
  background: rgba(0, 0, 0, 0.1);
  cursor: col-resize;
  user-select: none;
  touch-action: none;
`;

const ExtensionOptions = ({ data = [] }) => {
  // Import columns from utils
  const columns = useMemo(
    () => [
      {
        Header: 'Line',
        accessor: 'line',
        minWidth: 50,
        width: 80,
        maxWidth: 100,
      },
      {
        Header: 'Start Date',
        accessor: 'start',
        minWidth: 100,
        width: 120,
        maxWidth: 150,
      },
      {
        Header: 'Stop Date',
        accessor: 'stop',
        minWidth: 100,
        width: 120,
        maxWidth: 150,
      },
      {
        Header: 'Term',
        accessor: 'term',
        minWidth: 100,
        width: 150,
        maxWidth: 200,
      },
      {
        Header: 'Next Exercise Start',
        accessor: 'exerciseStart',
        minWidth: 100,
        width: 120,
        maxWidth: 150,
      },
      {
        Header: 'Next Exercise Stop',
        accessor: 'exerciseStop',
        minWidth: 100,
        width: 120,
        maxWidth: 150,
      },
      {
        Header: 'Start IFRS16',
        accessor: 'isBaselineIFRS16Option',
        minWidth: 80,
        width: 100,
        maxWidth: 120,
      },
      {
        Header: 'Reasonably Certain',
        accessor: 'isToBeExercised',
        minWidth: 80,
        width: 100,
        maxWidth: 120,
      },
      {
        Header: 'Complete',
        accessor: 'isCompleted',
        minWidth: 80,
        width: 100,
        maxWidth: 120,
      },
      {
        Header: 'Details',
        accessor: 'summary',
        minWidth: 150,
        width: 200,
        maxWidth: 300,
      },
      {
        Header: "IFRS16 Recognize From",
        accessor: "ifrs16RecognitionDate",
        minWidth: 100,
        width: 120,
        maxWidth: 150,
      },
      {
        Header: "Discount Rate Type",
        accessor: 'discRateAppType',
        minWidth: 100,
        width: 120,
        maxWidth: 150,
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
    useRowSelect,
    useResizeColumns
  );

  const RowRenderer = ({ row, rowAttributes }) => (
    <TableRowSelectable
      {...{ ...row.getRowProps(), ...rowAttributes }}
      row={row}
    >
      {row.cells.map(cell => (
        <td
          {...cell.getCellProps()}
          style={{
            position: 'relative',
            ...(cell.column.style || {}),
          }}
        >
          <StyledCell title={cell.value}>
            {cell.render('Cell')}
          </StyledCell>
          {cell.column.canResize && (
            <ResizeHandle {...cell.getResizerProps()} />
          )}
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