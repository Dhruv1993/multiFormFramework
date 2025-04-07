import * as React from 'react'
import styled from 'styled-components'
import { IconTypes } from './IconTypes'
import { IconType } from './IconType'
// import { IconType, IconTypes } from '@progenesis/components'
const backgroundColor = '#ecf2f7'
const textColor = '#58A3DC'

const backgroundHoverColor = '#dce9f3'
const textHoverColor = '#287ebf'

const backgroundActiveColor = '#58a3dc'
const textActiveColor = '#ffffff'

const RoundedButton = styled.div<{ disabled: boolean }>`
  background: ${backgroundColor};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${textColor};
  cursor: pointer;
`

const RoundedPagerButton = styled(RoundedButton)`
  ${props =>
    props.disabled
      ? `
    opacity: 0.2;
    cursor: initial;
  `
      : `
  &:hover {
    background: ${backgroundHoverColor};
    color: ${textHoverColor};
  }
  `};
`

const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;

  & > div {
    margin-right: 4px;
  }

  & > :last-child {
    margin-right: 0;
  }
`

export const PaginationButtons = ({
  pageIndex,
  pageCount,
  gotoPage,
  previousPage,
  canPreviousPage,
  canNextPage,
  nextPage,
}) => (
  <Container>
    <RoundedPagerButton onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
      <IconType icon={IconTypes.navToStart} />
    </RoundedPagerButton>

    <RoundedPagerButton
      onClick={() => previousPage()}
      disabled={!canPreviousPage}
    >
      <IconType icon={IconTypes.navPrevious} />
    </RoundedPagerButton>

    <PageIndexButtons
      pageIndex={pageIndex}
      pageCount={pageCount}
      gotoPage={gotoPage}
    />

    <RoundedPagerButton onClick={() => nextPage()} disabled={!canNextPage}>
      <IconType icon={IconTypes.navForward} />
    </RoundedPagerButton>

    <RoundedPagerButton
      onClick={() => gotoPage(pageCount - 1)}
      disabled={!canNextPage}
    >
      <IconType icon={IconTypes.navToEnd} />
    </RoundedPagerButton>
  </Container>
)

const PageIndexButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    margin-right: 4px;
  }

  & > :last-child {
    margin-right: 0;
  }
`

const RoundedPageNumberButton = styled(RoundedButton)<{
  disabled,
  onClick,
  currentPage
}>`
  ${props =>
    props.currentPage
      ? `
    background: ${backgroundActiveColor};
    color: ${textActiveColor};
    cursor: initial;
  `
      : `
    &:hover {
      background: ${backgroundHoverColor};
      color: ${textHoverColor};
    }
  `};
`

const maxPageButtons = 9

const PageIndexButtons = ({ gotoPage, pageCount, pageIndex }) => {
  let pageCounts

  pageCounts =
    pageCount > maxPageButtons
      ? new Array(maxPageButtons)
          .fill(null)
          .map((_, index) => pageIndex + index)
      : new Array(pageCount).fill(null).map((_, index) => index)

  pageCounts = pageCounts.filter(i => {
    return i < pageCount
  })

  return (
    <PageIndexButtonsContainer>
      {pageCounts.map(item => (
        <RoundedPageNumberButton
          key={`${item}-pager-button`}
          disabled={false}
          currentPage={pageIndex === item}
          onClick={() => gotoPage(item)}
        >
          {item + 1}
        </RoundedPageNumberButton>
      ))}
    </PageIndexButtonsContainer>
  )
}
