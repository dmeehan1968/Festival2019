import React from 'react'

const Html = ({inner, script}) => {
  return (<html>
    <head>
      <meta charSet="utf8" />
      <title>React</title>
      <script type="text/javascript" dangerouslySetInnerHTML={{__html: script}} />
      <link rel="stylesheet" type="text/css" href="/styles/stylesheet.css" />
    </head>
    <body>
      <main id="root">
        {inner}
        <script type="text/javascript" src="client.bundle.js" />
      </main>
    </body>
  </html>
  )
}

export default Html

// class Html extends React.Component {
//   render() {
//     return (<html>
//       <head>
//         <meta charSet="utf8" />
//         <title>React</title>
//         <script type="text/javascript" dangerouslySetInnerHTML={{__html: this.props.script}} />
//       </head>
//       <body>
//         <div id="root">
//           {this.props.inner}
//           <script type="text/javascript" src="client.bundle.js" />
//         </div>
//       </body>
//     </html>
// )
//   }
// }
//
