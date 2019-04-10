import express from 'express'
import path from 'path'
import database from './database'
import manifest from './manifest'
import paths from '../../config/paths'

const app = express()

async function boot(context) {
  context.app = express()
  return database(context)
    .then(db => context.app.set('db', db))
    .then(routes.bind(null, context))
}

const apiErrorHandler = (err, req, res, next) => {
  res.status(500).json({ success: false, error: err.stack })
  console.error(err.stack)
  next()
}

const webErrorHandler = (err, req, res, next) => {
  res.status(500).send(`<h1>500: Internal Server Error</h1><pre>${err.stack}</pre>`)
  next()
}

const devErrorHandler = (err, req, res, next) => {
  console.error(err.stack)
  next()
}

async function routes(context) {
  if (process.env.NODE_ENV === 'production') {
    context.app.use(paths.publicPath, express.static(paths.clientBuild))
  }
  context.app.use(manifest({ manifestPath: paths.manifestPath }))
  context.app.use('/App', express.static('/Users/dmeehan/Sites/2017.10parishesfestival.org.uk/App'))
  // context.app.get(['/events', '/events/:event'], require('server/routes/events/id').get, webErrorHandler)
  context.app.get('/api/events', require('server/routes/api/events').get, apiErrorHandler)
  context.app.get('/api/filters', require('server/routes/api/filters').get, apiErrorHandler)
  context.app.get('/*', require('server/routes').get, webErrorHandler)
  context.app.use(devErrorHandler)
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

boot({ port: 3000, dbhost: 'localhost', dbschema: '10p_festival2017', dbuser: 'root', dbpass: 'root' })
  .then(listen)
  .then(log)
  .catch(e => console.error(`Error: ${e.stack}`))