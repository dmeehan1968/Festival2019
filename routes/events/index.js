import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from '../../app'


export function get(req, res, next) {
  const html = ReactDOMServer.renderToString(<App />)
  res.send(html)
}
