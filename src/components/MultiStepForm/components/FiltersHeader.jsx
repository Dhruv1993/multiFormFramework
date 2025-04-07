import * as React from 'react'
import styled from 'styled-components'
import { Box, Flex } from 'rebass/styled-components'

import { SPACE } from '@progenesis/common'

import { ShowFiltersAccordion } from './ShowFiltersAccordion'

export const FiltersHeader = ({ headerGroups, hasFilters, resetFilters }) => {
  const filterControls = headerGroups
    .map(headerGroup =>
      headerGroup.headers.filter(header => typeof header.Filter !== 'undefined')
    )
    .reduce((flat, toFlatten) => flat.concat(toFlatten), [])

  const searchFilter = filterControls.find(control => control.primaryControl)
  const mainControls = filterControls.filter(control => !control.primaryControl)

  return (
    <>
      {searchFilter && (
        <Flex mb={mainControls.length === 0 ? SPACE.gaps.medium : 0}>
          {searchFilter.render('Filter') || null}
        </Flex>
      )}

      {mainControls.length > 0 && (
        <ShowFiltersAccordion
          onResetFilters={resetFilters}
          hasFilters={hasFilters}
        >
          <ControlsContainer>
            {mainControls.map((column, index) => (
              <FilterControl
                key={`${index}-${column.id || ''}`}
                column={column}
              />
            ))}
          </ControlsContainer>
        </ShowFiltersAccordion>
      )}
    </>
  )
}

const ControlsContainer = styled(Flex).attrs(props => ({
  ...props,
  flexWrap: 'wrap',
}))`
  & > div {
    padding-bottom: ${SPACE.padding.primary}px;
  }
`

const Label = styled.label`
  display: block;
`

export const FilterControl = ({ column }) => {
  return (
    <Box width={[1, 1 / 2, 1 / 2, 1 / 3]} px={1}>
      {column.filterTitle ? <Label>{column.filterTitle}</Label> : null}
      {column.canFilter && column.Filter ? column.render('Filter') : null}
    </Box>
  )
}
