
export default (db) => {

  db.models.events.belongsTo(db.models.venues, {
    foreignKey: 'venue_id',
  })

  db.models.events.belongsTo(db.models.contacts, {
    foreignKey: 'contact_id',
    as: 'contact',
  })

  db.models.events.belongsTo(db.models.contacts, {
    foreignKey: 'bookingcontact_id',
    as: 'bookingcontact',
  })

  db.models.events.belongsTo(db.models.images, {
    foreignKey: 'preferred_image_id',
    as: 'preferred_image'
  })

  db.models.events.belongsToMany(db.models.tags, {
    through: db.models.event_relatesto_tags,
    foreignKey: 'event_id',
    otherKey: 'tag_id',
  })

  db.models.events.belongsToMany(db.models.tags, {
    through: db.models.event_relatesto_tags,
    foreignKey: 'event_id',
    otherKey: 'tag_id',
    as: 'disciplines'
  })

  db.models.events.belongsToMany(db.models.tags, {
    through: db.models.event_relatesto_tags,
    foreignKey: 'event_id',
    otherKey: 'tag_id',
    as: 'eventstatus'
  })

  db.models.events.belongsToMany(db.models.tags, {
    through: db.models.event_relatesto_tags,
    foreignKey: 'event_id',
    otherKey: 'tag_id',
    as: 'eventtypes'
  })

  db.models.events.belongsToMany(db.models.images, {
    through: db.models.event_relatesto_images,
    foreignKey: 'event_id',
    otherKey: 'image_id',
    as: 'images'
  })

  db.models.events.hasMany(db.models.opening_times, {
    foreignKey: 'event_id',
  })

}
