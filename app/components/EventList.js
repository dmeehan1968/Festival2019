import React from 'react'
import { connect } from 'react-redux'
import { setEvents } from '../actions'
import EventCard from './EventCard'

const EventList = ({ events }) => {
  return (
    <section className="eventlist">
      {events.length == 0 ? <section>No events</section> : null}
      {events.map((event, index) => <EventCard key={index} {...event} />)}
    </section>
  )
}

const mapStateToProps = state => ({
  events: state.events
})

const mapDispatchToProps = dispatch => ({
  setEvents: events => dispatch(setEvents(events))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventList)
