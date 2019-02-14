module.exports = (req, res) => {
  const db = req.app.get('db')
  const Events = db.models.events
  return new Promise(resolve => {
    Events.findAll({ include: [ 'contact', 'bookingcontact', 'venue', 'preferred_image' ] }).then(events => {
      res.json(events)
    })
  })
}
