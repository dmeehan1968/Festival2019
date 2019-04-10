import React, { useState, useMemo } from 'react'
import Map from 'app/components/Map'
import VenueMapInfoDetail from 'app/components/VenueMapInfoDetail'
import VenueMapMarker from 'app/components/VenueMapMarker'

import { MapWrapper } from './styles'

export default ({ venues, height }) => {

  venues = useMemo(() => {
    return venues.filter(venue => venue.addresscontact && venue.addresscontact.longitude && venue.addresscontact.latitude)
  }, [ venues ])

  if (!venues.length) {
    return null
  }

  const bounds = useMemo(() => {
    return venues
      .map(venue => ({ longitude: venue.addresscontact.longitude, latitude: venue.addresscontact.latitude }))
      .reduce((acc, coords) => {
        return {
          minLng: Math.min(coords.longitude, typeof acc.minLng === 'undefined' ? coords.longitude : acc.minLng),
          maxLng: Math.max(coords.longitude, typeof acc.maxLng === 'undefined' ? coords.longitude : acc.maxLng),
          minLat: Math.min(coords.latitude, typeof acc.minLat === 'undefined' ? coords.latitude : acc.minLat),
          maxLat: Math.max(coords.latitude, typeof acc.maxLat === 'undefined' ? coords.latitude : acc.maxLat),
        }
      }, { })

  }, [ venues ])

  const center = {
    longitude: bounds.minLng + ((bounds.maxLng - bounds.minLng) / 2),
    latitude: bounds.minLat + ((bounds.maxLat - bounds.minLat) / 2),
  }

  // console.log(bounds)
  // console.log(center)

  const [ popup, setPopup ] = useState(null)

  return (
    <MapWrapper>
      <Map
        bounds={bounds}
        height={height}
        longitude={center.longitude}
        latitude={center.latitude}
        popup={popup}
        setPopup={setPopup}
      >
        {venues.map((venue, key) => <VenueMapMarker key={key} venue={venue} setPopup={setPopup} />)}
      </Map>
    </MapWrapper>
  )
}
