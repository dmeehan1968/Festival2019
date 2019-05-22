import React from 'react'
import { connect } from 'react-redux'

import EventPage from 'app/components/EventPage'
import NotFound from 'app/components/NotFound'

export const RoutedEventPage = ({
  match: { params: { id: eventId }},
  events = [],
  ...props,
}) => {
  eventId = Number(eventId)
  const event = events.find(event => event.id === eventId)
  if (event) {
    return <EventPage event={event} {...props} />
  } else {
    return <NotFound />
  }
}

const mapStateToProps = state => ({
  events: state.events,
})

export default connect(mapStateToProps)(RoutedEventPage)
