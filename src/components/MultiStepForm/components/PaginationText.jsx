import React, { useMemo } from 'react'
import styled from 'styled-components'
import { uniq } from 'lodash'

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: end;
  align-items: center;

  & > div {
    padding-right: 10px;
    padding-left: 10px;
  }

  & > :first-child {
    padding-left: 0;
  }

  & > :last-child {
    padding-right: 0;
  }
`

const VerticalSepartor = styled.span`
  border-right: 1px solid #ddd;
  display: block;
  width: 1px;
  height: 30px;
`

const SelectorContainer = styled.div`
  & > :first-child {
    padding-right: 10px;
  }

  & > :last-child {
    padding-left: 10px;
  }
`

export const PaginationText = ({
  pageIndex,
  pageSize,
  totalCount,
  pageOptions,
  setPageSize,
  pageCount,
}) => (
  <Container>
    <PageCountText
      pageCount={pageCount}
      pageIndex={pageIndex}
      pageSize={pageSize}
      totalCount={totalCount}
    />

    {pageCount > 1 && (
      <>
        <VerticalSepartor />

        <PageIndexText currentIndex={pageIndex + 1} totalPages={pageCount} />
      </>
    )}

    {totalCount > 0 && (
      <>
        <VerticalSepartor />

        <PageSelector {...{ pageSize, setPageSize }} />
      </>
    )}
  </Container>
)

const PageIndexText = ({ currentIndex, totalPages }) => (
  <div>
    Page {currentIndex} of {totalPages}
  </div>
)

const PageSelector = ({ pageSize, setPageSize }) => {
  const pageSizeOptions = useMemo(
    () => uniq([pageSize, 5, 10, 20, 30, 40, 50, 100]).sort((a, b) => a - b),
    []
  )
  return (
    <SelectorContainer>
      <span>Show</span>
      <select
        value={pageSize}
        onChange={e => {
          setPageSize(Number(e.target.value))
        }}
      >
        {pageSizeOptions.map(pageSize => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </select>
      <span>entries</span>
    </SelectorContainer>
  )
}

const Goto = ({ pageIndex, gotoPage }) => (
  <span>
    Go to page:
    <input
      type='number'
      defaultValue={pageIndex + 1}
      onChange={e => {
        const page = e.target.value ? Number(e.target.value) - 1 : 0
        gotoPage(page)
      }}
      style={{ width: '100px' }}
    />
  </span>
)

const PageCountText = ({ pageIndex, pageSize, totalCount, pageCount }) => {
  if (totalCount === 0) {
    return <div>There are no entries</div>
  }

  if (pageCount === 1) {
    return <div>Showing all {totalCount} entries</div>
  }

  const deriveLastIndex = () => {
    const pageCountOffset = totalPages - 1
    const lastPage =
      totalCount - pageCountOffset * pageSize + pageSize * pageCountOffset
    return lastPage
  }

  const derivePageIndex = () => pageIndex * pageSize + pageSize

  const totalPages = Math.ceil(totalCount / pageSize)
  const pageStartingIndex = pageIndex * pageSize + 1
  const lastTotalIndex = pageIndex + 1 === totalPages
  const pageEndingIndex = lastTotalIndex ? deriveLastIndex() : derivePageIndex()

  return (
    <div>
      Showing {pageStartingIndex} to {pageEndingIndex} of {totalCount} entries
    </div>
  )
}
