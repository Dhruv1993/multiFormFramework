import styled, { css } from 'styled-components'

export const rowOddBackgroundColor = 'rgb(243, 247, 251)'
export const rowEvenBackgroundColor = 'rgb(255, 255, 255)'
export const tableBorderColor = '#edf3f9'

export const TableContainer = styled.div`
  width: 100%;
  min-height: 542px;
  background: white;
  overflow-x: auto;
  border: 1px solid #ececec;
`

export const SharedTableElementStyle = css`
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  border-spacing: 0;
`
export const TableElement = styled.table`
  ${SharedTableElementStyle}
`

export const tableHeadBackgroundColor = '#e6e6e6'

export const SharedTableHeadStyle = css`
  background-color: ${tableHeadBackgroundColor};
`
export const TableHead = styled.thead`
  ${SharedTableHeadStyle}
`

export const SharedTableHeadRowStyle = css`
  height: 40px;
`
export const TableHeadRow = styled.tr`
  ${SharedTableHeadRowStyle}
`

export const SharedTableHeaderStyle = css`
  font-weight: 500;
  padding: 10px;
`
export const TableHeader = styled.th`
  ${SharedTableHeaderStyle}
`

export const TableHeaderSpan = styled.span`
  text-wrap: wrap;
`

export const SharedTableRowStyle = css`
  height: 50px;

  &:nth-child(odd) {
    background-color: ${rowOddBackgroundColor};
  }
  &:nth-child(even) {
    background-color: ${rowEvenBackgroundColor};
  }
`
export const TableRow = styled.tr`
  ${SharedTableRowStyle}
`

export const SharedTableRowSelectableStyle = css`
  & {
    cursor: pointer;
  }

  &:hover,
  &:active {
    background-color: 'black';
  }
`
export const TableRowSelectable = styled(TableRow).attrs(props => ({
  'data-id-type': 'table-row',
  ...props
}))`
  ${SharedTableRowSelectableStyle}
`

export const SharedTableDataCellStyle = css`
  border-left: 1px solid #ececec;
  border-right: 1px solid #ececec;
  padding: 10px;
  white-space: normal;
`
export const TableDataCell = styled.td`
  ${SharedTableDataCellStyle}
`

export const SharedTableBodyStyle = css``
export const TableBody = styled.tbody`
  ${SharedTableBodyStyle}
`

export const SharedTableFooterStyle = css``
export const TableFooter = styled.tfoot`
  ${SharedTableFooterStyle}
`
