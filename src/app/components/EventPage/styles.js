import styled from 'styled-components'

export const EventWrapper = styled.section`
  background-color: ${props=>props.theme.colorForeground};
  padding: ${props=>props.theme.spaceMd};
  ${p=>p.theme.media.greaterThan('desktop')`
    margin: ${props=>props.theme.spaceSm};
    box-shadow:
      ${props=>props.theme.lineXs}
      ${props=>props.theme.lineXs}
      ${props=>props.theme.lineLg}
      0
      ${props=>props.theme.colorTint};
  `}
`
EventWrapper.displayName = 'EventWrapper'

export const EventDetailWrapper = styled.section`
  h1 {
    font-weight: normal;
    color: ${props=>props.theme.colorTextHeading};
  }
`
EventDetailWrapper.displayName = 'EventDetailWrapper'

export const VenueDetailWrapper = styled.section`

`
VenueDetailWrapper.displayName = 'VenueDetailWrapper'
