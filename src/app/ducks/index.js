import { combineReducers } from 'redux'

import dates from './dates'
import events from './events'
import venues from './venues'
import regions from './regions'
import disciplines from './disciplines'
import filters from './filters'
import favourites from './favourites'
import gdpr from './gdpr'

export * from './dates'
export * from './events'
export * from './regions'
export * from './disciplines'
export * from './filters'
export * from './favourites'
export * from './gdpr'

export default combineReducers({
  dates,
  events,
  venues,
  regions,
  disciplines,
  filters,
  favourites,
  gdpr
})
