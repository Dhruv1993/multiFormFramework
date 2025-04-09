// TablePageableComponent.tsx
import * as React from 'react';
import { Flex } from 'rebass/styled-components';


import {
  TableRow as BaseTableRow,
  TableContainer as BaseTableContainer,
  TableElement as BaseTableElement,
  TableBody as BaseTableBody,
  TableDataCell as BaseTableDataCell,
  TableHead as BaseTableHead,
  TableHeader as BaseTableHeader,
  TableHeadRow as BaseTableHeadRow,
  PageableFooterControls,
  SortIcon,
  FiltersHeader,
} from '@progenesis/parts';

 

const DefaultRowRenderer = ({ row, rowAttributes }) => (
  <BaseTableRow {...row.getRowProps()} className="tr" row={row}>
    {row.cells.map((cell) => (
      <BaseTableDataCell
        {...cell.getCellProps()}
        className="td"
        style={{
          width: cell.column.width,
          minWidth: cell.column.minWidth,
          maxWidth: cell.column.maxWidth,
          ...cell.getCellProps().style,
        }}
      >
        {cell.render('Cell')}
      </BaseTableDataCell>
    ))}
  </BaseTableRow>
);

export const FlexibleTableComponent = ({
  loading = false,
  pageCount,
  totalCount,
  rowPropsTransform,
  RowRenderer = DefaultRowRenderer,
  HeaderSection,
  FooterSection,
  setAllFilters,
  enableFilters = false,
  selectedFlatRows,
  selectedRowIds,
  getTableProps,
  getTableBodyProps,
  prepareRow,
  headerGroups,
  canNextPage,
  canPreviousPage,
  previousPage,
  gotoPage,
  pageSize,
  pageIndex,
  pageOptions,
  setPageSize,
  nextPage,
  page,
  hasFilters,
  attributes,
  resetFilters,
  SingleBottomRow,
  className = '',
}) => {
  return (
    <>
      {enableFilters && (
        <FiltersHeader
          hasFilters={hasFilters}
          resetFilters={
            resetFilters === undefined
              ? () => setAllFilters?.([])
              : resetFilters
          }
          headerGroups={headerGroups}
        />
      )}

      {HeaderSection && (
        <HeaderSection {...{ selectedFlatRows, selectedRowIds, totalCount }} />
      )}

      <BaseTableContainer className='table-container'>
        <BaseTableElement
          {...getTableProps()}
          className={`table ${className}`}
          {...(attributes || {})}
        >
          <BaseTableHead className='thead'>
            {headerGroups.map(headerGroup => (
              <BaseTableHeadRow
                {...headerGroup.getHeaderGroupProps()}
                className='tr'
              >
                {headerGroup.headers.map(column => (
                  <BaseTableHeader
                    {...column.getHeaderProps()}
                    className='th'
                    style={{
                      width: column.width,
                      minWidth: column.minWidth,
                      maxWidth: column.maxWidth,
                      ...column.getHeaderProps().style,
                    }}
                  >
                    <Flex justifyContent='space-between' alignItems='center'>
                      <span {...column.getSortByToggleProps()}>
                        {column.render('Header')}
                      </span>
                      {column.isSorted ? <SortIcon {...column} /> : null}
                    </Flex>
                    {column.canResize && (
                      <div
                        {...column.getResizerProps()}
                        className={`resizer ${
                          column.isResizing ? 'isResizing' : ''
                        }`}
                        onPointerDown={e => e.stopPropagation()} // Prevent sorting on resize
                      />
                    )}
                  </BaseTableHeader>
                ))}
              </BaseTableHeadRow>
            ))}
          </BaseTableHead>

          <BaseTableBody {...getTableBodyProps()} className='tbody'>
            {page.map(row => {
              prepareRow(row)
              const rowAttributes = {
                ...(rowPropsTransform && rowPropsTransform(row)),
              }
              return <RowRenderer row={row} rowAttributes={rowAttributes} />
            })}
            {SingleBottomRow && (
              <div className='spacer' style={{ height: '2rem' }} />
            )}
            {SingleBottomRow && <SingleBottomRow {...getTableBodyProps()} />}
          </BaseTableBody>
        </BaseTableElement>
      </BaseTableContainer>

      <PageableFooterControls
        isLoading={loading}
        setPageSize={setPageSize}
        pageOptions={pageOptions}
        pageIndex={pageIndex}
        pageSize={pageSize}
        totalCount={totalCount}
        pageCount={pageCount}
        gotoPage={gotoPage}
        previousPage={previousPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        nextPage={nextPage}
      />

      {FooterSection && <FooterSection />}
    </>
  )
}