import { createActions, handleActions } from 'redux-actions'
import { combineReducers } from 'redux'

const { setRegionFilter } = createActions({
  SET_REGION_FILTER: regions => ({ regions }),
})

const regions = handleActions({
  [setRegionFilter]: (state, { payload: { regions }}) => regions.sort(),
}, [])

const { setDisciplineFilter } = createActions({
  SET_DISCIPLINE_FILTER: disciplines => ({ disciplines }),
})

const disciplines = handleActions({
  [setDisciplineFilter]: (state, { payload: { disciplines }}) => disciplines.sort(),
}, [])

const { setDateFilter } = createActions({
  SET_DATE_FILTER: dates => ({ dates }),
})

const dates = handleActions({
  [setDateFilter]: (state, { payload: { dates }}) => dates.sort(),
}, [])

const { setTextFilter } = createActions({
  SET_TEXT_FILTER: text => ({ text }),
})

const text = handleActions({
  [setTextFilter]: (state, { payload: { text }}) => text,
}, "")

export { setRegionFilter, setDisciplineFilter, setDateFilter, setTextFilter }

export default combineReducers({ regions, disciplines, dates, text })
