import React from 'react'
import styled from 'styled-components'

import NavBarTitle from './NavBarTitle'
import NavBarLeftAction from './NavBarLeftAction'
import NavBarRightAction from './NavBarRightAction'

export { NavBarTitle, NavBarLeftAction, NavBarRightAction }

export const NavBar = ({
  title = 'No Title',
  className,
}) => {
  return (
    <div className={className}>
      <NavBarLeftAction />
      <NavBarTitle>{title}</NavBarTitle>
      <NavBarRightAction />
    </div>
  )
}

export default styled(NavBar)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: ${p=>p.theme.spaceMd};

  ${p=>p.theme.media.lessThan('tablet')`
    ${NavBarTitle} {
      overflow: hidden;
    }
  `}
`
