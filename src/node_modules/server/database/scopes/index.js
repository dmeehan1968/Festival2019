import eventsScopes from './events'
import tagsScopes from './tags'
import datesScopes from './dates'
import venueScopes from './venues'

export default db => {
  eventsScopes(db)
  tagsScopes(db)
  datesScopes(db)
  venueScopes(db)
}
