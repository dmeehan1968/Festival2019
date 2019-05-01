import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { StaticRouter } from 'react-router-dom'
import sharp from 'sharp'
import path from 'path'

import App from 'app/components/App'
import reducers, { setEvent, setEvents, setDates } from 'app/ducks'
import Html from 'app/helpers/Html'

export function get(req, res, next) {
  const db = req.app.get('db')
  const imagePath = req.app.get('imagePath')
  const routerContext = {}

  return fetchData(db, imagePath)
    .then(getStore)
    .then(renderPage.bind(null, req.url, routerContext, res.locals))
    .then(page => res.send(page))
    .catch(next)
}

const sequelizeInstanceToJSON = instance => instance.toJSON()

const sequelizeArrayToJSON = arr => arr.map(sequelizeInstanceToJSON)

const checkImageDimensions = (imagePath, events) => {

  return Promise.all(
    events.map(event => {

      return Promise.all(event.images.map(image => {
        if (!image.width || !image.height) {
          const file = path.join(imagePath, '..', image.filename)
          return sharp(file).metadata().then(metadata => {
            image.height = metadata.height
            image.width = metadata.width
            // console.log('dimensions for', image.filename, image.width, image.height)
            // TODO: save image (move this routine to before sequelizeArrayToJSON)
            return image
          }).catch(err => console.log(err))
        }
        return image
      }))
      .then(images => {
        event.images = images
        if (event.preferred_image) {
          event.preferred_image = images.find(image => image.id === event.preferred_image.id)
        }
        return event
      })
    })
  )

}

const fetchData = (db, imagePath) => {
  const requests = {
    events: db.models.events.findAll().then(sequelizeArrayToJSON).then(checkImageDimensions.bind(null, imagePath)),
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
      scripts={[ locals.assetPath('bundle.js'), locals.assetPath('vendor.js') ]}
      css={[ locals.assetPath('bundle.css') ]}
    >
      {content}
    </Html>
  )
}
