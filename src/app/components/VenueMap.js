import React from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'

const VenueMap = ({ google, lat, lng, title }) => {
  if (!lat && !lng) {
    return <p>Map location not specified.</p>
  }
  return (
    <Map
      google={google}
      zoom={12}
      initialCenter={{ lat: lat, lng: lng }}
    >
      <Marker
        title={title}
        position={{ lat: lat, lng: lng }}>
      </Marker>
    </Map>
  )
}

export default GoogleApiWrapper({
  apiKey: '***REMOVED***',
})(VenueMap)
