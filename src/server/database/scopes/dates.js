export default db => {

  db.models.dates.addScope('defaultScope', {
    order: [ 'date' ]
  }, {
    override: true,
  })

}
