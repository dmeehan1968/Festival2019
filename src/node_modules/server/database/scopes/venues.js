import Sequelize from 'sequelize'

export default db => {

  db.models.venues.addScope('venuesmap', {
    include: [
      'addresscontact',
      {
        association: 'addresscontact',
        where: {
          latitude: { [Sequelize.Op.ne]: 0},
          longitude: { [Sequelize.Op.ne]: 0},
        }
      }
    ],
  })
}
