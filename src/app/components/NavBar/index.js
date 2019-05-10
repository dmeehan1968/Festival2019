import React from 'react'
import styled from 'styled-components'

export const NavBarTitle = styled.div``

export const NavBar = ({
  title = 'No Title',
  className,
}) => {
  return (
    <div className={className}>
      <div id="nav-bar-left-action" />
      <NavBarTitle>{title}</NavBarTitle>
      <div id="nav-bar-right-action" />
    </div>
  )
}

export default styled(NavBar)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: ${p=>p.theme.spaceMd};

  ${NavBarTitle} {
    text-align: center;
  }
`
