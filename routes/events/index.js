import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from '../../app'

class Html extends React.Component {
  render() {
    return (<html>
      <head>
        <meta charSet="utf8" />
        <title>React</title>
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
  const app = <App message={msg} />
  const html = ReactDOMServer.renderToString(<Html inner={app} />)
  res.send(html)
}
