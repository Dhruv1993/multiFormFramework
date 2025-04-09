import React, { useMemo } from 'react'
import {
  useTable,
  useFilters,
  useSortBy,
  usePagination,
  useRowSelect,
  useResizeColumns,
  useBlockLayout
} from 'react-table'
import { extensionColumns } from './extensionColumns'
import styled from 'styled-components'
import { FlexibleTableComponent } from '../components/FlexibleTable'

const defaultTablePageableState = {
  pageIndex: 0,
  pageSize: 10,
  sortBy: [],
  filters: [],
}
const Styles = styled.div`
  padding: 1rem;

  .table-container {
    width: 100%;
    overflow-x: auto;
    min-height: 0;
  }

  .table {
    display: inline-block;
    border-spacing: 0;
  }

  .tbody {
    background: #fff;
  }

  .td {
    margin: 0;
    padding: 12px 8px;
    border-right: 1px solid #e0e0e0;
    position: relative;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:last-child {
      border-right: 0;
    }
  }

  .td {
    color: #555;
  }

  .resizer {
    display: inline-block;
    background: #ccc;
    width: 4px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
    touch-action: none;
    opacity: 0;
    transition: opacity 0.2s ease;

    &:hover,
    &.isResizing {
      opacity: 1;
      background: #999;
    }
  }

  .spacer {
    height: 2rem;
    width: 100%;
  }
`
export const ExtensionOptions = ({ data = [] }) => {
  // Import columns from utils
  const columns = useMemo(() => extensionColumns, [])
  // Use data passed as prop
  const memoData = useMemo(
    () =>
      data.map(item => ({
        ...item,
        isBaselineIFRS16Option: item.isBaselineIFRS16Option ? (
          <i className='bi bi-check-circle-fill text-success' title='Yes'></i>
        ) : (
          <i className='bi bi-x-circle-fill text-danger' title='No'></i>
        ),
        isToBeExercised: item.isToBeExercised ? (
          <i className='bi bi-check-circle-fill text-success' title='Yes'></i>
        ) : (
          <i className='bi bi-x-circle-fill text-danger' title='No'></i>
        ),
        isCompleted: item.isCompleted ? (
          <i className='bi bi-check-circle-fill text-success' title='Yes'></i>
        ) : (
          <i className='bi bi-x-circle-fill text-danger' title='No'></i>
        ),
        discRateAppType:
          item.discRateAppType === 1
            ? 'Fixed'
            : item.discRateAppType === 0
            ? 'Variable'
            : item.discRateAppType === 2
            ? 'Mixed'
            : 'N/A',
      })),
    [data]
  )

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
    useBlockLayout,
    useResizeColumns
  )

  // const RowRenderer = ({ row, rowAttributes }) => (
  //   <TableRow {...row.getRowProps()} {...rowAttributes} className='tr'>
  //     {row.cells.map(cell => (
  //       <div {...cell.getCellProps()} className='td'>
  //         {cell.render('Cell')}
  //       </div>
  //     ))}
  //   </TableRow>
  // )

  const rowPropsTransform = useMemo(
    () => row => ({
      onClick: () => row.toggleRowSelected(),
      'data-testid': 'extension-option-row',
    }),
    []
  )

  return (
    <div>
      <h2>Extension Options</h2>
      <Styles>
        <FlexibleTableComponent
          attributes={{
            'data-testid': 'extension-options-table',
          }}
          data={memoData}
          columns={columns}
          hasFilters={filters.length > 0}
          enableFilters={true}
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
      </Styles>
    </div>
  )
}
