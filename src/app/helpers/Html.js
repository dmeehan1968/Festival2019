import React from 'react'
import serialize from 'serialize-javascript'
import { Helmet } from 'react-helmet'

export default ({
  children,
  state = {},
  scripts = [],
  styles = [],
}) => {
  const head = Helmet.renderStatic()
  return (
    <html {...head.htmlAttributes.toComponent()}>
      <head>
        <meta charSet="utf-8" />
        <meta name = "viewport" content = "user-scalable=no, width=device-width" />
        {head.meta.toComponent()}
        {head.title.toComponent()}
        {head.base.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}
        {head.noscript.toComponent()}
        {head.style.toComponent()}
        {styles.map((style, key) => {
          if (typeof style === 'string') {
            return <link key={key} type="text/css" rel="stylesheet" href={style} />
          } else {
            return style
          }
        })}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
          __html: `window.__INITIAL_STATE__ = ${serialize(state, { isJSON: true })}`,
          }}
        />
      </head>
      <body {...head.bodyAttributes.toComponent()}>
        <div
          id="root"
          dangerouslySetInnerHTML={{
            __html: children
          }}
        />
        {scripts.map((script, key) => <script key={key} type="text/javascript" src={script} />)}
      </body>
    </html>
  )
}
