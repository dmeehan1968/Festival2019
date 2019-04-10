import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Pin = styled(FontAwesomeIcon)`
  font-size: 32px;
  color: ${props=>props.theme.colorAccent};
  filter: drop-shadow(2px 2px 2px ${p=>p.theme.colorDropShadow});
`
