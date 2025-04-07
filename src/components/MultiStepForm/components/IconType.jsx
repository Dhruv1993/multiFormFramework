import * as React from 'react'
import styled from 'styled-components'

 

export const IconType= ({ icon, ...rest }) => (
  <Icon
    {...rest}
    data-id-icon={icon}
    className={typeof rest.className === 'string' ? `${rest.className} ${icon}` : icon}
  />
)

const Icon = styled.i`
  color: #5f5f5f;
  font-size: 12px;
  line-height: 12px;
  padding-right: 4px;
  padding-left: 4px;
  // conflicting global margin style :/
  margin: 0 !important;
`

export const setIconPaddingRight = (props) => {
  return (
    (props.icon &&
      (props.titleText || props.labelText) &&
      `
  & > i {
      padding-right: 10px;
  }`) ||
    ''
  )
}
