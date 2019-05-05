import express from 'express'
import path from 'path'
import assert from 'assert'
import database from './database'
import manifest from './manifest'
import paths from '../../config/paths'
import ExpressImageMiddleware from 'server/ExpressImageMiddleware'

async function boot(context) {
  context.app = express()
  context.app.set('imagePath', process.env.IMAGE_PATH)
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
  console.error(err.stack)
  next()
}

const devErrorHandler = (err, req, res, next) => {
  console.error(err.stack)
  next()
}

const KeepAliveMiddleware = (timeout = 5, max = 1000) => {
  return (req, res, next) => {
    res.set({
      Connection: 'keep-alive',
      'Keep-Alive': `timeout=${timeout}, max=${max}`
    })
    next()
  }
}

function routes(context) {
  context.app.use(KeepAliveMiddleware())
  context.app.use(paths.publicPath, express.static(paths.clientBuild))
  context.app.use(manifest({ manifestPath: paths.manifestPath }))
  context.app.use('/App', ExpressImageMiddleware(context.app.get('imagePath')))
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

assert(process.env.PORT, 'PORT not defined in .env')
assert(process.env.DB_HOST, 'DB_HOST not defined in .env')
assert(process.env.DB_SCHEMA, 'DB_SCHEMA not defined in .env')
assert(process.env.DB_USER, 'DB_USER not defined in .env')
assert(process.env.DB_PASS, 'DB_PASS not defined in .env')

boot({
  port: process.env.PORT,
  dbhost: process.env.DB_HOST,
  dbschema: process.env.DB_SCHEMA,
  dbuser: process.env.DB_USER,
  dbpass: process.env.DB_PASS,
})
  .then(listen)
  .then(log)
  .catch(e => console.error(`Error: ${e.stack}`))
