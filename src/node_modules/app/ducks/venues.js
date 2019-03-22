import { createActions, handleActions } from 'redux-actions'

const defaultState = []

export const { setVenues } = createActions({
  SET_EVENTS: venues => ({ venues })
})

export default handleActions({
  [setVenues]: (state, { payload: { venues }}) => venues
}, defaultState)
