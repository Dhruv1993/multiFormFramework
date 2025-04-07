import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex } from 'rebass/styled-components'
import { IconType, IconTypes, SmallActionButton } from '@progenesis/components'

export const ShowFiltersAccordion = ({
  children,
  hasFilters,
  onResetFilters,
}) => {
  const [state, setState] = useState(false)
  const icon = state ? IconTypes.arrowUp : IconTypes.arrowDown
  const buttonText = state ? 'Hide advanced filters' : 'Show advanced filters'

  return (
    <>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <ToggleFiltersButton onClick={() => setState(!state)}>
          <IconType icon={icon} /> {buttonText}
        </ToggleFiltersButton>

        {onResetFilters ? (
          <SmallActionButton
            size={'sm'}
            disabled={!hasFilters}
            variant={'primary'}
            onClick={onResetFilters}
          >
            <IconType icon={IconTypes.revert} /> Reset Filters
          </SmallActionButton>
        ) : null}
      </Flex>

      {state && <Divider />}

      {state && children}
    </>
  )
}

const ToggleFiltersButton = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  cursor: pointer;
  color: #6c757d;
`

const Divider = styled.div`
  display: block;
  margin-bottom: 10px;
  border-bottom: 1px dashed black;
`
