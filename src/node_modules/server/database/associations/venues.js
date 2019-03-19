export default (db) => {

  db.models.venues.hasMany(db.models.events, {
    foreignKey: 'venue_id',
  })

  db.models.venues.belongsToMany(db.models.tags, {
    through: db.models.venue_relatesto_tags,
    foreignKey: 'venue_id',
    otherKey: 'tag_id',
    as: 'regions'
  })

  db.models.venues.belongsTo(db.models.tags, {
    foreignKey: 'dog_id',
    as: 'dog'
  })

  db.models.venues.belongsTo(db.models.tags, {
    foreignKey: 'disabled_id',
    as: 'disabled'
  })

  db.models.venues.belongsTo(db.models.tags, {
    foreignKey: 'toilet_id',
    as: 'toilet'
  })

  db.models.venues.belongsTo(db.models.contacts, {
    foreignKey: 'addresscontact_id',
    as: 'addresscontact',
  })

  db.models.venues.belongsTo(db.models.contacts, {
    foreignKey: 'venuecontact_id',
    as: 'venuecontact',
  })


}
