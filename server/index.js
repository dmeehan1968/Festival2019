const express = require('express')
const app = express()
const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')

function associateSchema(db) {
  db.models.events.belongsTo(db.models.contacts, { as: 'contact', foreignKey: 'contact_id' })
  db.models.events.belongsTo(db.models.contacts, { as: 'bookingcontact', foreignKey: 'bookingcontact_id' })
  db.models.events.belongsTo(db.models.venues, { as: 'venue', foreignKey: 'venue_id' })
  db.models.events.belongsTo(db.models.images, { as: 'preferred_image', foreignKey: 'preferred_image_id' })
  db.models.venues.belongsTo(db.models.contacts, { foreignKey: 'venuecontact_id', as: 'venuecontact' })
  db.models.venues.belongsTo(db.models.contacts, { foreignKey: 'addresscontact_id', as: 'addresscontact' })
  db.models.venues.belongsTo(db.models.tags, { foreignKey: 'disabled_id', as: 'disabled' })
  db.models.venues.belongsTo(db.models.tags, { foreignKey: 'toilet_id', as: 'toilet' })
  db.models.venues.belongsTo(db.models.tags, { foreignKey: 'dog_id', as: 'dog' })
  db.sync({ alter: false })
}

function stripExtension(file) {
  const matchExtension = /\.[^\\.]+$/
  return file.replace(matchExtension, '')
}

function excludeRelations(file) {
  return !/_relatesto_/.test(file)
}

function indexModels(dirname) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirname, (err, files) => {
      if (err) return reject(err);
      resolve(files
        .map(file => path.join(dirname, file))
        .map(stripExtension)
        .filter(excludeRelations)
      )
    })
  })
}

async function importSchema(db, models) {
  models.forEach(model => db.import(model))
}

async function database(context) {
  const db = new Sequelize(context.dbschema, context.dbuser, context.dbpass, {
    host: context.dbhost,
    dialect: 'mysql',
    operatorsAliases: false,
    logging: false,
  })

  return indexModels(path.join(__dirname, '../models'))
    .then(importSchema.bind(null, db))
    .then(associateSchema.bind(null, db))
    .then(() => db)
}

async function boot(context) {
  context.app = express()
  return database(context)
    .then(db => context.app.set('db', db))
    .then(routes.bind(null, context))
}

async function routes(context) {
  context.app.use(express.static('dist/public'))
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
