import React from 'react'
import { connect } from 'react-redux'

import EventPage from 'app/components/EventPage'

export const RoutedEventPage = ({
  match: { params: { id: eventId }},
  events = [],
  ...props,
}) => {
  eventId = Number(eventId)
  return <EventPage event={events.find(event => event.id === eventId)} {...props} />
}

const mapStateToProps = state => ({
  events: state.events,
})

export default connect(mapStateToProps)(RoutedEventPage)
