import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from '../../app/components/App'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from '../../app/reducers'
import { setEvents } from '../../app/actions'
import Html from '../../app/components/Html'

const msg = 'Hello Server'

export function get(req, res, next) {

  const db = req.app.get('db')
  db.models.events.scope('eventlist').findAll().then(events => {
    return createStore(rootReducer, { events: events.map(event => event.toJSON()) })
  }).then(store => {
    const script = `window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}`
    const app = (
      <Provider store={store}>
        <App message={msg} />
      </Provider>
    )
    const html = ReactDOMServer.renderToString(<Html inner={app} script={script} />)
    res.send(html)
  })

}
