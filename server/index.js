const express = require('express')
const app = express()
const Sequelize = require('sequelize')

async function boot(context) {
  context.app = express()
  const db = new Sequelize('10p_festival2017', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
  })
  context.Event = db.define('event', {
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      field: 'title',
    }
  }, {
    tableName: 'events'
  })
  context.Event.removeAttribute('createdAt')
  context.Event.removeAttribute('updatedAt')
  context.app.set('db', db)
  return context
}

async function routes(context) {
  context.app.get('/', require('../sample/hello-world'))
  context.app.get('/events', require('../routes/events'))
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
