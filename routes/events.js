module.exports = (req, res) => {
  const db = req.app.get('db')
  const Event = db.models.event
  return new Promise(resolve => {
    Event.findAll().then(events => {
      res.json(events)
    })
  })
}
