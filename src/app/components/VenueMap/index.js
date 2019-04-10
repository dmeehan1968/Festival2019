import React, { useState } from 'react'
import Map from 'app/components/Map'
import VenueMapInfoDetail from 'app/components/VenueMapInfoDetail'
import VenueMapMarker from 'app/components/VenueMapMarker'

import { MapWrapper } from './styles'

export default ({ venue }) => {

  if (!venue.addresscontact) {
    return null
  }

  const [ popup, setPopup ] = useState(null)

  return (
    <MapWrapper>
      <Map
        latitude={venue.addresscontact.latitude}
        longitude={venue.addresscontact.longitude}
        popup={popup}
        setPopup={setPopup}
      >
        <VenueMapMarker venue={venue} setPopup={setPopup} />
      </Map>
    </MapWrapper>
  )
}
