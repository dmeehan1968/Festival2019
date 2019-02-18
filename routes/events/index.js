import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from '../../app'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from '../../app/reducers'
import { setEvents } from '../../app/actions'

class Html extends React.Component {
  render() {
    return (<html>
      <head>
        <meta charSet="utf8" />
        <title>React</title>
        <script type="text/javascript" dangerouslySetInnerHTML={{__html: this.props.script}} />
      </head>
      <body>
        <div id="root">
          {this.props.inner}
          <script type="text/javascript" src="client.bundle.js" />
        </div>
      </body>
    </html>
)
  }
}

const msg = 'Hello Server'

export function get(req, res, next) {

  const db = req.app.get('db')
  db.models.events.findAll().then(events => {
    return createStore(rootReducer, { events })
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
