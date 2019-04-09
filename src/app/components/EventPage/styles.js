import styled from 'styled-components'

export const EventWrapper = styled.section`
  background-color: ${props=>props.theme.colorForeground};
  margin: ${props=>props.theme.spaceSm};
  padding: ${props=>props.theme.spaceMd};
  box-shadow:
    ${props=>props.theme.lineXs}
    ${props=>props.theme.lineXs}
    ${props=>props.theme.lineLg}
    0
    ${props=>props.theme.colorTint};
`

export const EventDetailWrapper = styled.section`
  h1 {
    font-weight: normal;
    color: ${props=>props.theme.colorTextHeading};
  }
`

export const VenueDetailWrapper = styled.section`
  
`
