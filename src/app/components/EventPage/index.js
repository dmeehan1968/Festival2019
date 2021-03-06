import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import VenueMap from 'app/components/VenueMap'
import VenueDetail from 'app/components/VenueDetail'
import OpeningTimes from 'app/components/OpeningTimes'
import Meta from 'app/components/Meta'
import NavBarAction from 'app/components/NavBarAction'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { EventWrapper, EventDetailWrapper, VenueDetailWrapper } from './styles'
import Image from 'app/components/Image'
import Carousel from 'app/components/Carousel'

import styled from 'styled-components'

const StyledImage = styled.img`
  height: auto;
  max-height: 100%;
  width: auto;
  max-width: 100%;
  object-fit: contain;
`

const CarouselImage = ({
  src,
  height,
  width,
  ['data-carousel-height']: carouselHeight,
  ['data-carousel-width']: carouselWidth,
  ...props,
}) => {
  const uri = src + '?' + [
    carouselHeight && `height=${carouselHeight}`,
    carouselWidth && `width=${carouselWidth}`,
  ].filter(item => !!item).join('&')

  return (
    <StyledImage
      {...props}
      src={uri}
      {...{ height, width }}
    />
  )
}

export const ContactName = ({
  organisation,
  name,
}) => {
  if (organisation && organisation.length && name && name.length) {
    return `${organisation} (${name})`
  } else if (organisation && organisation.length) {
    return organisation
  } else if (name && name.length) {
    return name
  } else {
    return 'No Contact Name'
  }
}

export const BookingContact = ({
  contact,
}) => {
  if (!contact) {
    return null
  }
  const name = [ contact.firstname, contact.lastname ].filter(v=>!!v).join(' ')

  return (
    <>
      <ContactName organisation={contact.organisation} name={name} />
      {contact.telephone && contact.telephone.length &&
        <div>{contact.telephone}</div>
      }
      {contact.website && contact.website.length &&
        <div><a href={contact.website}>{contact.website}</a></div>
      }
    </>
  )
}

export const ActionLabel = styled.span`
  ${p=>p.theme.media.lessThan('mobile')`
    display: none;
  `}
`
export const EventPage = ({ event = {}, dates = [] }) => {
  // sanitize
  event = {
    ...event,
    eventstatus: event.eventstatus || [],
    eventtypes: event.eventtypes || [],
    disciplines: event.disciplines || [],
    contact: event.contact || {},
    opening_times: event.opening_times || [],
  }

  const autoHttpPrefix = (address) => {
    if (!/^https?:\/\//.test(address)) {
      return 'http://' + address
    }
    return address
  }

  return (
    <EventWrapper>
      <Helmet>
        <title>{event.title}</title>
      </Helmet>
      <NavBarAction id="nav-bar-left-action">
        <Link to="/">&lt;<ActionLabel> Events</ActionLabel></Link>
      </NavBarAction>
      <EventDetailWrapper>
        <h1>{event.title || 'No Title'}</h1>

        {event.images && event.images.length && (
          <Carousel height={400}>
            {event.images.map((image, key) => {
              return (
                <CarouselImage
                  key={key}
                  src={image.filename}
                  height={image.height}
                  width={image.width}
                />
              )
            })}
          </Carousel>
        ) || null
        }

        <dl>
          <Meta title="Status" content={event.eventstatus.map(s => s.description).join(', ')} />
          <Meta title="Subtitle" content={event.subtitle} />
          <Meta title="About the Event" content={event.shortdesc} />
          <Meta title="Event Type" content={event.eventtypes.map(e => e.description).join(', ')} />
          <Meta title="Disciplines" content={event.disciplines.map(d => d.description).join(', ')} />
          <Meta title="Telephone" content={event.contact.telephone && <a href={`tel:${event.contact.telephone}`}>{event.contact.telephone}</a>} />
          <Meta title="Email" content={event.contact.email && <a href={`mailto:${event.contact.email}`}>{event.contact.email}</a>} />
          <Meta title="Web" content={event.contact.website && <a href={autoHttpPrefix(event.contact.website)} target="_blank">{event.contact.website}</a>} />
          <Meta title="Booking Contact" content={event.bookingcontact && <BookingContact contact={event.bookingcontact} />} />
          <Meta title="Booking Info" content={event.charginginfo} />
          <Meta title="Age Info" content={event.ageinfo} />
          <Meta title="Opening Times" content={<OpeningTimes dates={dates} times={event.opening_times}/>} />
          <Meta title="Further Info" content={event.furtherinfo} />
          <Meta title="Long Description" content={event.longdesc && <ReactMarkdown source={event.longdesc} />} />
        </dl>
      </EventDetailWrapper>
      <VenueDetailWrapper>
        <h2>Venue Information</h2>
        { event.venue && <VenueDetail venue={event.venue} /> || <p>No Venue Information</p> }
      </VenueDetailWrapper>
    </EventWrapper>
  )
}

const mapStateToProps = state => ({
  dates: state.dates,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(EventPage)
