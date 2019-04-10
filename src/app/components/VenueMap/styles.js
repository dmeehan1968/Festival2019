import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const MapWrapper = styled.div`
  height: 400px;
  width: 100%;
  position: relative;
  overflow: hidden;
  z-index: 0;
`

export const Pin = styled(FontAwesomeIcon)`
  font-size: ${props=>props.theme.textXl};
  color: ${props=>props.theme.colorAccent}
`

export const NavigationControlWrapper = styled.div`
  position: absolute;
  top: ${p=>p.theme.spaceMd};
  left: ${p=>p.theme.spaceMd};
`
