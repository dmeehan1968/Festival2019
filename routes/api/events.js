module.exports = {
  get: (req, res, next) => {
    const db = req.app.get('db')
    const Events = db.models.events
    return Events
      .findAll()
      .then(events => {
        res.json({ success: true, events: events.map(event => event.toJSON()) })
      })
      .catch(next)
  }
}
