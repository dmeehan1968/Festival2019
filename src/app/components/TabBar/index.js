import React from 'react'

import { TabBarContainer, TabBar, TabBarItem } from './styles'

export default ({
  children,
 }) => {
  return (
    <TabBarContainer>
      <TabBar>
        {React.Children.map(children, (child, key) => (<TabBarItem key={key}>{child}</TabBarItem>))}
      </TabBar>
    </TabBarContainer>

  )
}
