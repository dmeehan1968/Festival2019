import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: inherit;
  }

  body {
    font-family: ${p=>p.theme.fontPrimary};
    font-size: ${p=>p.theme.textBaseSize};
    line-height: ${p=>p.theme.bodyLineHeight};
    padding: 0;
    margin: 0;
    color: ${p=>p.theme.colorText};
    background-color: ${p=>p.theme.colorBackground};
  }

  h1, h2, h3, h4, h5, h6 {
    line-height: ${p=>p.theme.headingLineHeight};
    margin-bottom: ${p=>p.theme.spaceXxs};
    color: ${p=>p.theme.colorTextHeading};
    font-weight: bold;
  }

  h1 {
    font-size: ${p=>p.theme.textXxl};
  }

  h2 {
    font-size: ${p=>p.theme.textXl};
  }

  h3 {
    font-size: ${p=>p.theme.textLg};
  }

  h4 {
    font-size: ${p=>p.theme.textMd};
  }

  h5 {
    font-size: ${p=>p.theme.textSm};
  }

  h6 {
    font-size: ${p=>p.theme.textXs};
  }

  p {
    line-height: ${p=>p.theme.bodyLineHeight};
    margin-bottom: ${p=>p.theme.spaceSm};
  }

  a {
    color: ${p=>p.theme.colorLink};
    text-decoration: none;
  }

  a:visited {
    color: ${p=>p.theme.colorLinkVisited};
  }

  b, strong {
    font-weight: bold;
  }
`
