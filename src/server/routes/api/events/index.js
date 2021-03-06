
export function get(req, res, next) {
  const db = req.app.get('db')
  return db.models.events
    .findAll()
    .then(events => events.map(event => event.toJSON()))
    .then(events => {
      res.json({ success: true, events })
    })
    .catch(next)
}
