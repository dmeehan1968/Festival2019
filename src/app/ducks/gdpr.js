import { createActions, handleActions } from 'redux-actions'

const defaultState = {}

export const { setCookieConsent } = createActions({
  SET_COOKIE_CONSENT: cookieConsent => ({ cookieConsent })
})

export default handleActions({
  [setCookieConsent]: (state, { payload: { cookieConsent }}) => ( {cookieConsent} )
}, defaultState)
