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
  position: relative;

  ${NavBarLeftAction} {
      position: absolute;
      left: ${p=>p.theme.spaceSm};
  }

  ${NavBarRightAction} {
      position: absolute;
      right: ${p=>p.theme.spaceSm};
  }

`
