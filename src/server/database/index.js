import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import createAssociationsBetweenModels from './associations'
import createScopesForModels from './scopes'

function stripExtension(file) {
  const matchExtension = /\.[^\\.]+$/
  return file.replace(matchExtension, '')
}

function getArrayOfModelFilenamesForPath(dirname) {
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

function importModelsFromFilepaths(db, models) {
  models.forEach(model => db.import(model))
}

export default function database(context) {
  const db = new Sequelize(context.dbschema, context.dbuser, context.dbpass, {
    host: context.dbhost,
    dialect: 'mysql',
    operatorsAliases: false,
    logging: false,
  })

  // NB: __dirname is relative to 'build' directory, due to babel
  return getArrayOfModelFilenamesForPath(path.resolve(__dirname, '../../src/models'))
    .then(importModelsFromFilepaths.bind(null, db))
    .then(createAssociationsBetweenModels.bind(null, db))
    .then(() => db.sync({ alter: false }))
    .then(createScopesForModels.bind(null, db))
    .then(() => db)
}
