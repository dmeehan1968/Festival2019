import React from 'react'
import { connect } from 'react-redux'
import { setEvents } from './actions'

class EventList extends React.Component {

  render() {
    return (
      <ul>
        {this.props.events.length == 0 ? <li>No events</li> : null}
        {this.props.events.map((event, index) => <li key={index}>{event.title}</li>)}
      </ul>
    )
  }
}

const mapStateToProps = state => ({
  events: state.events
})

const mapDispatchToProps = dispatch => ({
  setEvents: events => dispatch(setEvents(events))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventList)
