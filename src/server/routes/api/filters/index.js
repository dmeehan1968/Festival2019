export function get(req, res, next) {
  const { models: { tags, dates }} = req.app.get('db')

  return Promise.resolve({
    regions: tags.scope('regions').findAll(),
    disciplines: tags.scope('disciplines').findAll(),
    dates: dates.findAll(),
  })
  .then(obj => {
    return Promise.all([
      Object.keys(obj),
      ...Object.values(obj)
    ])
  })
  .then(([keys, ...values]) => {
    return [
      keys,
      ...values.map(value => value.map(instance => instance.toJSON()))
    ]
  })
  .then(([keys, ...values]) => {
    let obj = {}
    keys.forEach((key, index) => {
      obj[key] = values[index]
    })
    return obj
  })
  .then(obj => {
    res.json({ success: true, ...obj })
  })
  .catch(next)

}
