module.exports = {
  get: (req, res, next) => {
    const db = req.app.get('db')
    const Events = db.models.events
    return new Promise(resolve => {
      Events
        .findAll({
          include: [ 'contact', 'bookingcontact', {
            association: 'venue',
            include: [ 'venuecontact', 'addresscontact', 'disabled', 'toilet', 'dog' ]
          }, 'preferred_image' ],
          order: [ 'title' ]
        })
        .then(events => {
          res.json({ success: true, events })
        })
        .catch(next)
      })
  }
}
