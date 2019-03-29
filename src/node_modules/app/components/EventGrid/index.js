import React from 'react'
import { connect } from 'react-redux'

import EventSummary from 'app/components/EventSummary'
import { setFavourite } from 'app/ducks'

import styles from './EventGrid.less'

const EventGrid = ({
  events = [],
  favourites = [],
  setFavourite,
  className = styles.container,
}) => {
  return (
    <section className={className}>
      {events.length && events.map((event, key) => {
        const isFavourite = !!favourites.find(fav=>fav===event.id)
        return (
          <EventSummary
            key={key}
            isFavourite={isFavourite}
            setFavourite={setFavourite}
            {...event}
          />
        )
      }) || <p>No Events</p>}
    </section>
  )
}

const mapStateToProps = state => ({
  favourites: state.favourites,
})

const mapDispatchToProps = dispatch => ({
  setFavourite: (id, checked) => dispatch(setFavourite(id, checked))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventGrid)
