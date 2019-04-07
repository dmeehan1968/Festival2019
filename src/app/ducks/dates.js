import { createActions, handleActions } from 'redux-actions'

const defaultState = []

export const { setDates } = createActions({
  SET_DATES: dates => ({ dates })
})

export default handleActions({
  [setDates]: (state, { payload: { dates }}) => dates
}, defaultState)
