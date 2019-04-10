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

const rootReducer = storage.reducer(reducers)
const engine = filter(createEngine('root'), [ 'filters', 'favourites' ])
const middleware = storage.createMiddleware(engine)

const store = createStore(rootReducer, window.__INITIAL_STATE__, applyMiddleware(middleware))

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