const express = require('express')
const app = express()
const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')

async function boot(context) {
  context.app = express()
  const db = new Sequelize('10p_festival2017', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
  })
  const models = path.join(__dirname, '../models')
  fs.readdirSync(models).forEach(filename => {
    if (!/_relatesto_/.test(filename)) {
      const matchExtension = /\.[^\\.]+$/
      filename = filename.replace(matchExtension, '')
      db.import(path.join(models, filename))
    }
  })
  db.models.events.belongsTo(db.models.contacts, { as: 'contact', foreignKey: 'contact_id' })
  db.models.events.belongsTo(db.models.contacts, { as: 'bookingcontact', foreignKey: 'bookingcontact_id' })
  db.models.events.belongsTo(db.models.venues, { as: 'venue', foreignKey: 'venue_id' })
  db.models.events.belongsTo(db.models.images, { as: 'preferred_image', foreignKey: 'preferred_image_id' })
  db.sync({ alter: false })
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
