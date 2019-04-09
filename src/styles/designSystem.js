import styled from 'styled-components'
import { modularScale, math, lighten, darken, opacify } from 'polished'

export const colorBrandBlue = '#283e6b'
export const colorPrimary = colorBrandBlue
export const colorPrimaryLight = lighten(0.15, colorPrimary)
export const colorPrimaryDark = darken(0.15, colorPrimary)
export const colorPrimaryBg = opacify(0.2, colorPrimary)

export const colorBrandOrange = '#f18823'
export const colorAccent = colorBrandOrange
export const colorAccentLight = lighten(0.15, colorAccent)
export const colorAccentDark = darken(0.15, colorAccent)
export const colorAccentBg = opacify(0.2, colorAccent)

export const colorBlack = 'black'
export const colorGray10 = lighten(0.1, colorBlack)
export const colorGray9 = lighten(0.1, colorBlack)
export const colorGray8 = lighten(0.2, colorBlack)
export const colorGray7 = lighten(0.3, colorBlack)
export const colorGray6 = lighten(0.4, colorBlack)
export const colorGray5 = lighten(0.5, colorBlack)
export const colorGray4 = lighten(0.6, colorBlack)
export const colorGray3 = lighten(0.7, colorBlack)
export const colorGray2 = lighten(0.8, colorBlack)
export const colorGray1 = lighten(0.9, colorBlack)
export const colorWhite = 'white'

export const colorText = colorGray9
export const colorTextHeading = colorBlack
export const colorLink = colorPrimary
export const colorLinkVisited = colorPrimaryDark
export const colorBackground = colorGray1
export const colorForeground = colorWhite
export const colorTint = colorGray3
export const colorOverlay = opacify(0.8, colorBlack)

export const textXs = modularScale(-2)
export const textSm = modularScale(-1)
export const textMd = modularScale(0)
export const textLg = modularScale(1)
export const textXl = modularScale(2)
export const textXxl = modularScale(3)
export const textXxxl = modularScale(4)

export const headingLineHeight = 1.2
export const bodyLineHeight = 1.4

export const spaceUnit = '1em'
export const spaceXxxs = modularScale(-2)
export const spaceXxs = modularScale(-1)
export const spaceXs = modularScale(0)
export const spaceSm = modularScale(1)
export const spaceMd = modularScale(2)
export const spaceLg = modularScale(3)
export const spaceXl = modularScale(4)
export const spaceXxl = modularScale(6)
export const spaceXxxl = modularScale(8)

export const lineXs = '1px'
export const lineMd = '2px'
export const lineLg = '4px'
export const lineXl = '8px'

export const headerHeight = '40px'
export const footerHeight = '75px'


//
// @mobile:     ~"only screen and (max-width: 529px)";
// @tablet:     ~"only screen and (min-width: 530px) and (max-width: 949px)";
// @desktop:    ~"only screen and (min-width: 950px) and (max-width: 1128px)";
// @desktop-xl: ~"only screen and (min-width: 1129px)";
//
