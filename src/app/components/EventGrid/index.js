import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import EventSummary from 'app/components/EventSummary'
import { setFavourite } from 'app/ducks'

export const EventGrid = ({
  events = [],
  favourites = [],
  setFavourite,
  className,
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

const ConnectedEventGrid = connect(mapStateToProps, mapDispatchToProps)(EventGrid)

export default styled(ConnectedEventGrid)`
  line-height: 0;
  column-gap: ${p=>p.theme.spaceXs};
  column-width: 15rem;
`
