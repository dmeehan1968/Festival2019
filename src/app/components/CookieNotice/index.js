import styled from 'styled-components'
import CookieNotice, { Notice, PolicyLink, Dismiss } from './CookieNotice'

const StyledCookieNotice = styled(CookieNotice)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${p=>p.theme.spaceXs} ${p=>p.theme.spaceMd};
  background-color: ${p=>p.theme.colorBrandOrange};
  color: ${p=>p.theme.colorWhite};

  ${Notice} {
    margin-bottom: 0;
  }

  ${PolicyLink} {
    margin-left: ${p=>p.theme.spaceSm};
    color: ${p=>p.theme.colorWhite};
    text-decoration: underline;
  }

  ${Dismiss} {
    margin-left: auto;
    background-color: transparent;
    border-radius: 5px;
    border-color: ${p=>p.theme.colorWhite};
    border-width: 1px;
    border-style: solid;
    padding: ${p=>p.theme.spaceXs};
  }
`

StyledCookieNotice.displayName = 'CookieNotice'

export default StyledCookieNotice
