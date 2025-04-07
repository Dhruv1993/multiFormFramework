import * as React from 'react'
import styled from 'styled-components'

export const SortIcon = ({ isSorted, canSort, isSortedDesc, ...rest }) =>
  <div {...rest} {...getAttributes({isSortedDesc, canSort})}>
    <Arrows isSortedDesc={isSortedDesc} canSort={canSort} isSorted={isSorted}/>
  </div>

const Arrows = ({ isSortedDesc, isSorted, canSort }) => {
  if (canSort && !isSorted) {
    return <>
      <Arrow active={false}>↑</Arrow>
      <Arrow active={false}>↓</Arrow>
    </>
  }

  return <>
    <Arrow active={isSortedDesc}>↑</Arrow>
    <Arrow active={!isSortedDesc}>↓</Arrow>
  </>
}

const Arrow = styled.span<{ active: boolean }>`
  opacity: ${props => props.active ? 1 : 0.3};
  font-weight: 500;
  font-size: 14px;
`

const getAttributes = ({isSortedDesc, canSort}) => {
  if (canSort) {
    return { ['sort-order']: isSortedDesc ? 'desc' : 'asc' }
  }

  return {}
}
