import { createActions, handleActions } from 'redux-actions'

const defaultState = []

export const { setFavourite } = createActions({
  SET_FAVOURITE: (eventId, selected) => ({ eventId, selected })
})

export default handleActions({
  [setFavourite]: (state, { payload: { eventId, selected }}) => {
    if (selected) {
      return [ ...new Set([ ...state, eventId ]) ]
    } else {
      return state.filter(id => id !== eventId)
    }
  }
}, defaultState)
