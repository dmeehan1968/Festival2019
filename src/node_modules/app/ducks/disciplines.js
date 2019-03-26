import { createActions, handleActions } from 'redux-actions'

const defaultState = []

export const { setDisciplines } = createActions({
  SET_DATES: disciplines => ({ disciplines })
})

export default handleActions({
  [setDisciplines]: (state, { payload: { disciplines }}) => dates
}, defaultState)
