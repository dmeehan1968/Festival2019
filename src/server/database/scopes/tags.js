export default db => {

  db.models.tags.addScope('regions', {
    attributes: ['id', 'description'],
    include: [
      {
        model: db.models.tag_categories,
        attributes: [],
        where: {
          category: 'region',
        }
      }
    ],
    order: [ 'description' ]
  })

  db.models.tags.addScope('disciplines', {
    attributes: ['id', 'description'],
    include: [
      {
        model: db.models.tag_categories,
        attributes: [],
        where: {
          category: 'discipline',
        }
      }
    ],
    order: [ 'description' ]
  })

}
