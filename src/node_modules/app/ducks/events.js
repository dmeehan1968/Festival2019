import { createActions, handleActions } from 'redux-actions'

const defaultState = []

export const { setEvents } = createActions({
  SET_EVENTS: events => ({ events })
})

export default handleActions({
  [setEvents]: (state, { payload: { events }}) => events
}, defaultState)
