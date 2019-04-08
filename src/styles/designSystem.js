import styled from 'styled-components'
import { lighten, darken, opacify } from 'polished'

const pow = (value, power) => {
  if (power <= 1) return value
  return value * pow(value, power-1)
}

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

export const textScaleRatio = 1.2
export const textXs = (1 / pow(textScaleRatio, 2)) + 'em'
export const textSm = (1 / textScaleRatio) + 'em'
export const textLg = (1 * pow(textScaleRatio, 2)) + 'em'
export const textXl = (1 * pow(textScaleRatio, 3)) + 'em'
export const textXxl = (1 * pow(textScaleRatio, 4)) + 'em'
export const textXxxl = (1 * pow(textScaleRatio, 5)) + 'em'

export const headingLineHeight = 1.2
export const bodyLineHeight = 1.4

export const spaceUnit = '1em'
export const spaceXxxs = 0.25 * spaceUnit
export const spaceXxs = 0.375 * spaceUnit
export const spaceXs = 0.5 * spaceUnit
export const spaceSm = 0.75 * spaceUnit
export const spaceMd = 1.25 * spaceUnit
export const spaceLg = 2 * spaceUnit
export const spaceXl = 3.25 * spaceUnit
export const spaceXxl = 5.25 * spaceUnit
export const spaceXxxl = 8.5 * spaceUnit

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
