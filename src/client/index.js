import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from 'app/components/App'
import { createStore, applyMiddleware } from 'redux'
import reducers, { setEvents } from 'app/ducks'
import { BrowserRouter } from 'react-router-dom'

import * as storage from 'redux-storage'

// Use 'src' directly, not package build products
// See https://github.com/dmeehan1968/Festival2019/issues/17#issuecomment-495922400
import createEngine from 'redux-storage-engine-localstorage/src'

import filter from 'redux-storage-decorator-filter'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

const rootReducer = storage.reducer(reducers)
const engine = filter(createEngine('root'), [ 'filters', 'favourites', 'gdpr' ])
const middleware = storage.createMiddleware(engine)

import { utcDateFromSQLDate } from 'app/helpers/dateTime'

const hydrateState = state => {
  return ({
    ...state,
    dates: state.dates.map(date => ({
      ...date,
      date: new Date(date.date)
    })),
    events: state.events.map(event => ({
      ...event,
      opening_times: event.opening_times.map(openingTime => ({
        ...openingTime,
        start: new Date(openingTime.start),
        end: new Date(openingTime.end),
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
