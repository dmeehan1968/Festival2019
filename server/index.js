import express from 'express'
const app = express()
import database from './database'

async function boot(context) {
  context.app = express()
  return database(context)
    .then(db => context.app.set('db', db))
    .then(routes.bind(null, context))
}

async function routes(context) {
  context.app.use(express.static('dist/public'))
  context.app.use('/styles', express.static('styles'))
  context.app.use('/App', express.static('/Users/dmeehan/Sites/2017.10parishesfestival.org.uk/App'))
  context.app.get('/events', require('../routes/events').get)
  context.app.get('/api/events', require('../routes/api/events').get)
  context.app.use((err, req, res, next) => {
    console.error(err.message)
    res.json({ success: false, error: err.message })
  })
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
  .catch(e => console.error(`Error: ${e.message}`))
