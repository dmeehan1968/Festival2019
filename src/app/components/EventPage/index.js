import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import VenueMap from 'app/components/VenueMap'
import VenueDetail from 'app/components/VenueDetail'
import OpeningTimes from 'app/components/OpeningTimes'
import Meta from 'app/components/Meta'
import NavBarAction from 'app/components/NavBarAction'
import { Link } from 'react-router-dom'

import styles from './Event.less'

export const EventPage = ({ event = {}, dates = [] }) => {
  const unspecified = { description: 'Unspecified' }
  return (
    <section className={styles.event}>
      <Helmet>
        <title>{event.title}</title>
      </Helmet>
      <NavBarAction id="nav-bar-left-action">
        <Link to="/">&lt; Events</Link>
      </NavBarAction>
      <section className={styles.eventDetail}>
        <h1 className={styles.title}>{event.title}</h1>
        <dl>
          <Meta title="Status" content={event.eventstatus.map(s => s.description).join(', ')} />
          <Meta title="Subtitle" content={event.subtitle} />
          <Meta title="About the Event" content={event.shortdesc} />
          <Meta title="Event Type" content={event.eventtypes.map(e => e.description).join(', ')} />
          <Meta title="Disciplines" content={event.disciplines.map(d => d.description).join(', ')} />
          <Meta title="Telephone" content={event.contact.telephone} />
          <Meta title="Email" content={event.contact.email} />
          <Meta title="Web" content={event.contact.website} />
          <Meta title="Booking Contact" content="-" />
          <Meta title="Booking Info" content="-" />
          <Meta title="Age Info" content={event.ageinfo} />
          <Meta title="Opening Times" content={<OpeningTimes dates={dates} times={event.opening_times}/>} />
          <Meta title="Further Info" content={event.furtherinfo} />
          <Meta title="Long Description" content={event.longdesc} />
        </dl>
      </section>
      <section className={styles.venueDetail}>
        <h2>Venue Information</h2>
        { event.venue && <VenueDetail venue={event.venue} eventTitle={event.title} /> || <p>No Venue Information</p> }
      </section>
    </section>
  )
}

const mapStateToProps = state => ({
  dates: state.dates,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(EventPage)
