import eventAssociations from './events'
import venueAssociations from './venues'
import tagAssociations from './tags'

export default (db) => {
  eventAssociations(db)
  venueAssociations(db)
  tagAssociations(db)
}
