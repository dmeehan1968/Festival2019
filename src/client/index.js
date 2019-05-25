import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from 'app/components/App'
import { createStore, applyMiddleware } from 'redux'
import reducers, { setEvents } from 'app/ducks'
import { BrowserRouter } from 'react-router-dom'

import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage'
import filter from 'redux-storage-decorator-filter'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

const rootReducer = storage.reducer(reducers)
const engine = filter(createEngine('root'), [ 'filters', 'favourites', 'gdpr' ])
const middleware = storage.createMiddleware(engine)

import { DateTime } from 'luxon'

const hydrateState = state => {
  return ({
    ...state,
    dates: state.dates.map(date => ({ ...date, date: DateTime.fromISO(date.date) })),
    events: state.events.map(event => ({
      ...event,
      opening_times: event.opening_times.map(openingTime => ({
        ...openingTime,
        start: DateTime.fromISO(openingTime.start),
        end: DateTime.fromISO(openingTime.end),
      }))
    }))
  })
}

const store = createStore(rootReducer, hydrateState(window.__INITIAL_STATE__), composeWithDevTools(applyMiddleware(middleware)))

const loader = storage.createLoader(engine)

loader(store).then(() => {
  ReactDOM.hydrate((
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    ),
    document.getElementById("root")
  )

  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept()
    }
  }
})
