import * as React from 'react'
import { Flex } from 'rebass/styled-components'
// import {
//   PropsTransformer,
//   TableRow,
//   TableContainer,
//   TableElement,
//   TableBody,
//   TableDataCell,
//   TableHead,
//   TableHeader,
//   TableHeadRow,
//   PageableFooterControls,
//   SortIcon,
//   FiltersHeader,
// } from '../index'

import styled from 'styled-components'
import { TableBody, TableContainer, TableDataCell, TableElement, TableHead, TableHeader, TableHeadRow, TableRow } from './TableComponents'
import { FiltersHeader } from './FiltersHeader'
import { PageableFooterControls } from './PageableFooterControls'
import { SortIcon } from './SortIcon'

type SpacerProps  = {
  height?: string
}

const Spacer = styled.div<SpacerProps>`
  height: ${({ height }) => height || '1rem'};
  width: 100%;
`;


const DefaultRowRenderer = ({ row, rowAttributes }) => (
  <TableRow {...{ ...row.getRowProps(), ...rowAttributes }} row={row}>
    {row.cells.map(cell => {
      const col = cell.column
      const havingStyle = col.width || col.minWidth || col.maxWidth
      return (
        <TableDataCell
          {...cell.getCellProps()}
          style={
            havingStyle
              ? {
                  width: col.width,
                  minWidth: col.minWidth,
                  maxWidth: col.maxWidth,
                }
              : undefined
          }
        >
          {cell.render('Cell')}
        </TableDataCell>
      )
    })}
  </TableRow>
)

export function TablePageableComponent({
  loading,
  pageCount,
  totalCount,
  rowPropsTransform,
  RowRenderer = DefaultRowRenderer,
  HeaderSection,
  FooterSection,
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
  enableFilters,
  page,
  hasFilters,
  setAllFilters,
  attributes,
  resetFilters,
  SingleBottomRow
}) {
  return (
    <>
      {enableFilters && (
        <FiltersHeader
          hasFilters={hasFilters}
          resetFilters={
            resetFilters === undefined ? () => setAllFilters([]) : resetFilters
          }
          headerGroups={headerGroups}
        />
      )}

      {HeaderSection && (
        <HeaderSection {...{ selectedFlatRows, selectedRowIds, totalCount }} />
      )}

      <TableContainer>
        <TableElement {...getTableProps()} {...(attributes || {})}>
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableHeadRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <TableHeader
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    <Flex
                      justifyContent={'space-between'}
                      alignItems={'center'}
                    >
                      <span>{column.render('Header')}</span>
                      {column.isSorted ? <SortIcon {...column} /> : ''}
                    </Flex>
                  </TableHeader>
                ))}
              </TableHeadRow>
            ))}
          </TableHead>

          <TableBody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row)

              const rowAttributes = {
                ...(rowPropsTransform && rowPropsTransform(row)),
              }

              return <RowRenderer row={row} rowAttributes={rowAttributes} />
            })}
            {SingleBottomRow && <Spacer height='2rem' />}
            {SingleBottomRow && <SingleBottomRow {...getTableBodyProps()} />}
          </TableBody>
        </TableElement>
      </TableContainer>
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
