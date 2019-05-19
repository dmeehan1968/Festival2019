import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import GoogleMap from 'app/components/GoogleMap'

const InfoWindow = styled.div`
  background-color: ${p=>p.theme.colorWhite};
  color: ${p=>p.theme.colorText};
  h1 {
    font-size: ${p=>p.theme.textLg};
  }
  h2 {
    font-size: ${p=>p.theme.textMd};
  }
`

export const VenueMap = ({
  venues,
  events,
  height,
}) => {

  venues = useMemo(() => {
    return venues.filter(venue => venue.addresscontact && venue.addresscontact.longitude && venue.addresscontact.latitude)
  }, [ venues ])

  if (!venues.length) {
    return null
  }

  return (
    <GoogleMap
      height={height}
      apiParams={{ key: process.env.GoogleMapsAPI }}
      defaultZoom={10}
      onMapLoad={(google, map)=>{
        const bounds = venues.reduce((bounds, venue) => {
          bounds.extend({ lat: venue.addresscontact.latitude, lng: venue.addresscontact.longitude })
          return bounds
        }, new google.maps.LatLngBounds())
        map.fitBounds(bounds)
      }}
    >
      {venues.map((venue, key) => {
        return (
          <InfoWindow
            key={key}
            lat={venue.addresscontact.latitude}
            lng={venue.addresscontact.longitude}
          >
            <h1>{venue.title}</h1>
            <p>
              {
                [
                  venue.addresscontact.address1,
                  venue.addresscontact.address2,
                  venue.addresscontact.address3,
                  venue.addresscontact.town,
                  venue.addresscontact.county,
                  venue.addresscontact.postcode,
                ].filter(addr=>!!addr).map((addr, key)=>(<React.Fragment key={key}>{addr}<br /></React.Fragment>))
              }
            </p>
            <h2>Events at this venue</h2>
            {
              events.filter(event=>event.venue_id == venue.id).map((event, key, array) => {
                return (
                  <React.Fragment key={key}>
                    <Link to={`/events/${event.id}`}>{event.title}</Link>
                    {key < array.length-1 && <span>, </span>}
                  </React.Fragment>
                )
              })
            }
          </InfoWindow>
        )
      })}
    </GoogleMap>
  )

}

const mapStateToProps = state => ({
  events: state.events
})

export default connect(mapStateToProps)(VenueMap)
