import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { StaticRouter } from 'react-router-dom'

import App from 'app/components/App'
import reducers, { setEvent, setEvents, setDates } from 'app/ducks'
import Html from 'app/helpers/Html'

export function get(req, res, next) {
  const db = req.app.get('db')
  const routerContext = {}

  return fetchData(db)
    .then(getStore)
    .then(renderPage.bind(null, req.url, routerContext, res.locals))
    .then(page => res.send(page))
    .catch(next)
}

const sequelizeInstanceToJSON = instance => instance.toJSON()

const sequelizeArrayToJSON = arr => arr.map(sequelizeInstanceToJSON)

const fetchData = (db) => {
  const requests = {
    events: db.models.events.findAll().then(sequelizeArrayToJSON),
    dates: db.models.dates.findAll().then(sequelizeArrayToJSON),
    venues: db.models.venues.scope('venuesmap').findAll().then(sequelizeArrayToJSON),
    disciplines: db.models.tags.scope('disciplines').findAll().then(sequelizeArrayToJSON),
    regions: db.models.tags.scope('regions').findAll().then(sequelizeArrayToJSON),
  }

  return Promise
    .all(Object.values(requests))
    .then(results => {
      return results.reduce((accumulator, result, index) => {
        return {
          ...accumulator,
          [Object.keys(requests)[index]]: result
        }
      }, {})
    })
}

const getStore = (data) => {
  return createStore(reducers, data)
}

const renderPage = (url, context, locals, store) => {
  const { filters, favourites, ...initialState } = store.getState()

  const content = ReactDOMServer.renderToString((
    <Provider store={store}>
      <StaticRouter location={url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  ))

  return '<!doctype html>' + ReactDOMServer.renderToString(
    <Html
      state={initialState}
      scripts={[ locals.assetPath('bundle.js') ]}
      css={[ locals.assetPath('bundle.css') ]}
    >
      {content}
    </Html>
  )
}