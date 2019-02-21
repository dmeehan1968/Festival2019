const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

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
  db.models.venues.belongsToMany(db.models.tags, {
    through: 'venue_relatesto_tags',
    foreignKey: 'venue_id',
    otherKey: 'tag_id',
    as: 'tags'
  })
  db.models.venues.belongsToMany(db.models.tags, {
    through: 'venue_relatesto_tags',
    foreignKey: 'venue_id',
    otherKey: 'tag_id',
    as: 'regions'
  })
  db.models.tags.belongsTo(db.models.tag_categories, {
    foreignKey: 'tag_category_id',
    as: 'categories'
  })
  db.sync({ alter: false })
}

function addScopes(db) {
  db.models.events.addScope('defaultScope', {
    include: [
      'contact',
      'bookingcontact',
      {
        association: 'venue',
        include: [
          'venuecontact',
          'addresscontact',
          'disabled',
          'toilet',
          'dog',
          {
            association: 'regions',
            include: [
              {
                association: 'categories',
                attributes: [],
                where: {
                  category: 'region'
                }
              }
            ],
          }
        ]
      },
      'preferred_image'
    ],
    order: [ 'title' ]
  }, {
    override: true
  })

  db.models.events.addScope('eventlist', {
    attributes: [ 'id', 'title', 'subtitle', 'shortdesc' ],
    include: [ 'preferred_image' ],
    order: [ 'title' ],
  })
}

function stripExtension(file) {
  const matchExtension = /\.[^\\.]+$/
  return file.replace(matchExtension, '')
}

function indexModels(dirname) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirname, (err, files) => {
      if (err) return reject(err);
      resolve(files
        .map(file => path.join(dirname, file))
        .map(stripExtension)
      )
    })
  })
}

async function importSchema(db, models) {
  models.forEach(model => db.import(model))
}

export default async function database(context) {
  const db = new Sequelize(context.dbschema, context.dbuser, context.dbpass, {
    host: context.dbhost,
    dialect: 'mysql',
    operatorsAliases: false,
    logging: false,
  })

  return indexModels(path.join(__dirname, '../models'))
    .then(importSchema.bind(null, db))
    .then(associateSchema.bind(null, db))
    .then(addScopes.bind(null, db))
    .then(() => db)
}