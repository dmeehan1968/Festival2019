import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Event from '../../../app/components/Event'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from '../../../app/reducers'
import Html from '../../../app/components/Html'

export function get(req, res, next) {
  const db = req.app.get('db')
  db.models.events.findOne({
    where: { id: req.params.event }
  }).then(event => {
    if (event) {
      // const store = createStore(rootReducer, { event: event.toJSON() })
      // const script = `window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}`
      // const app = (
      //   <Provider store={store}>
      //     <Event {...event} />
      //   </Provider>
      // )
      // const html = ReactDOMServer.renderToString(<Html inner={app} script={script} />)
      // res.send(html)
      res.send(event)
    } else {
      // TODO: 404
      res.sendStatus(404)
    }
  })
}