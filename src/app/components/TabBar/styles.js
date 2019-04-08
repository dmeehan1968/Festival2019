import styled from 'styled-components'

export const TabBarContainer = styled.nav`
  border-top: 1px solid gray;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100vw;
`

export const TabBar = styled.ul`
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(75px, 1fr));
  grid-column-gap: 1em;
  align-items: center;
  height: 100%;

  svg[data-prefix="fas"] {
    font-size: ${({ theme: { textLg }}) => textLg }
  }
`

export const TabBarItem = styled.li`
  width: 100%;
  text-align: center;
`
