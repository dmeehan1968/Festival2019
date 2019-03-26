import { createActions, handleActions } from 'redux-actions'

const defaultState = []

export const { setRegions } = createActions({
  SET_DATES: regions => ({ regions })
})

export default handleActions({
  [setRegions]: (state, { payload: { regions }}) => dates
}, defaultState)
