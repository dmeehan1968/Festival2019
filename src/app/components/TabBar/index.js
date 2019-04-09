import React from 'react'

import { NavWrapper, ListContainer, ListItem } from './styles'

export default ({
  children,
 }) => {
  return (
    <NavWrapper>
      <ListContainer>
        {React.Children.map(children, (child, key) => (<ListItem key={key}>{child}</ListItem>))}
      </ListContainer>
    </NavWrapper>

  )
}
