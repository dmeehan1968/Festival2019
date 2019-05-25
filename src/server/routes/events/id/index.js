import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers, { setEvent, setEvents, setDates } from 'app/ducks'
import Html from 'app/helpers/Html'
import EventPage from 'app/components/EventPage'
import serialize from 'serialize-javascript'
import Sequelize from 'sequelize'

import Cookies from 'cookies'
import * as storage from 'redux-storage'
import filter from 'redux-storage-decorator-filter'
import createExpressCookieEngine from 'server/custom-redux-storage-engine-express-cookie'

export function get(req, res, next) {
  const db = req.app.get('db')

  createInitialStore(req.cookies, () => {})
  .then(fetchData.bind(null, db, req.params.event))
  .then(dispatchResultsToStore)
  .then(setCookieFromStore.bind(null, res.cookie.bind(res)))
  .then(setServerResponse.bind(null, req.params.event, res.status.bind(res)))
  .then(renderPageFromStore)
  .then(response => res.send(response))
  .catch(next)
}

const sequelizeInstanceToJSON = instance => instance.toJSON()

const sequelizeArrayToJSON = arr => arr.map(sequelizeInstanceToJSON)

const getEvents = (db, filters, dates) => {

  filters = {
    ...filters,
    dates: filters.dates.map(dateId => {
      const date = dates.find(date => date.id === dateId)
      if (date) {
        return date.date
      }
      throw new Error('no matching date')
    })
  }

  return db.models.events.scope('eventlist')
    .findAll()
    .then(events => filterEvents(filters, events))
    .then(sequelizeArrayToJSON)
}

const filterEvents = (filters, events) => {

  return events.filter(event => {

    if (!filters.regions.length && !filters.disciplines.length && !filters.dates.length) {
      return true
    }

    if (!event.venue || !event.venue.regions) {
      return false
    }

    const intersection = (arr1, arr2, comparitor = () => true) => {
      return arr1.filter(item1 => arr2.filter(item2 => comparitor(item1, item2)).length > 0)
    }

    if (intersection(
      event.venue.regions,
      filters.regions,
      (item1, item2) => item1.id === item2
    ).length === 0) {
      return false
    }

    if (intersection(
      event.disciplines,
      filters.disciplines,
      (item1, item2) => item1.id === item2
    ).length === 0) {
      return false
    }

    const include = event.opening_times.filter(open => {
      return filters.dates.filter(date => open.start.hasSame(date, 'day')).length > 0
    })
    .length > 0
    return include
  })
}

const getEvent = (db, eventId) => {
  return eventId ? db.models.events
    .findOne({
      where: { id: eventId }
    })
    .then(sequelizeInstanceToJSON) : null
}

const getDates = (db) => {
  return db.models.dates
    .findAll({ order: [ 'date' ] })
    .then(sequelizeArrayToJSON)
}

const fetchData = (db, event, store) => {
  const { filters = {} } = store.getState()

  return getDates(db)
  .then(dates => {
    return Promise.all([
      store,
      getEvents(db, filters, dates),
      dates,
      getEvent(db, event)
    ])
  })
}

const createInitialStore = (cookies, setCookie) => {
  const rootReducer = storage.reducer(reducers)
  const engine = filter(createExpressCookieEngine('root', cookies, setCookie), [
    'filters'
  ])
  const middleware = storage.createMiddleware(engine)

  const store = createStore(rootReducer, undefined, applyMiddleware(middleware))
  const loader = storage.createLoader(engine)
  return loader(store).then(() => store)
}

const dispatchResultsToStore = ([ store, events, dates, event ]) => {
  store.dispatch(setEvents(events))
  store.dispatch(setDates(dates))
  store.dispatch(setEvent(event))
  return store
}

const setCookieFromStore = (setCookie, store) => {
  setCookie('root', serialize({ filters: store.getState().filters }, { isJSON: true }))
  return store
}

const renderPageFromStore = (store) => {
  return Html(
    ReactDOMServer.renderToString((
      <Provider store={store}>
        <EventPage />
      </Provider>
    )),
    store.getState()
  )
}

const setServerResponse = (eventId, statusCallback, store) => {
  statusCallback(eventId && ! store.getState().event ? 404 : 200)
  return store
}
