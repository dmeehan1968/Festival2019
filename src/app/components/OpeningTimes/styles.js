import styled from 'styled-components'
import { readableColor } from 'polished'

export const Table = styled.table`

  width: 100%;
  border-spacing: ${props=>props.theme.lineXs};

  thead td {
    background-color: ${props=>props.theme.colorAccent};
    color: ${props=>readableColor(props.theme.colorAccent)};
  }

  td {
    padding: ${props=>props.theme.spaceXxxs} ${props=>props.theme.spaceXxs};
  }
`
