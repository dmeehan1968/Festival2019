import styled from 'styled-components'

export const Term = styled.dt`
  font-weight: bold;
  color: ${props=>props.theme.colorTextHeading};
  margin-bottom: ${props=>props.theme.spaceSm};
`
export const Definition = styled.dd`
  margin-bottom: ${props=>props.theme.spaceSm};
`
