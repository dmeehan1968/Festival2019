const express = require('express')
const app = express()

async function boot(context) {
  context.app = express()
  context.app.set('db', {})
  return context
}

async function routes(context) {
  context.app.get('/', require('../sample/hello-world'))
  return context
}

function listen(context) {
  return new Promise(resolve => {
    context.app.listen(context.port, (server) => {
      context.server = server
      resolve(context)
    })
  })
}

function log(context) {
  console.log(`Listening on port ${context.port}`)
}

boot({ port: 3000 })
  .then(routes)
  .then(listen)
  .then(log)
