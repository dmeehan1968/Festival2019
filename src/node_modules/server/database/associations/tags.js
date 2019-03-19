export default (db) => {

  db.models.tags.belongsTo(db.models.tag_categories, {
    foreignKey: 'tag_category_id',
  })

}
