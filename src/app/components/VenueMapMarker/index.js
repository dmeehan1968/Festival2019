import React from 'react'
import ReactMap, { Marker } from 'react-map-gl'
import VenueMapInfoDetail from 'app/components/VenueMapInfoDetail'

import { Pin } from './styles'

export default ({
  venue,
  icon = 'map-marker',
  iconHotspot = { x: 20, y: 32 },
  setPopup,
}) => {

  if (!venue.addresscontact || !venue.addresscontact.latitude || !venue.addresscontact.longitude) {
    return null
  }

  const { latitude, longitude } = venue.addresscontact

  return (
    <Marker
      latitude={latitude}
      longitude={longitude}
      offsetLeft={-iconHotspot.x}
      offsetTop={-iconHotspot.y}
    >
      <Pin icon={icon} fixedWidth={true} onClick={() => setPopup(<VenueMapInfoDetail venue={venue} />)} />
    </Marker>

  )
}
