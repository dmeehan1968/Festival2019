import React, { useState, useMemo } from 'react'
import Map, { MapMarker } from 'app/components/Map'
import styled from 'styled-components'

import { MapWrapper } from './styles'

const InfoWindow = styled.div`
  padding: 1em;
  background-color: ${p=>p.theme.colorWhite};
  color: ${p=>p.theme.colorText};
`

export const VenueMap = ({ venues, height }) => {

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
        {venues.map((venue, key) =>
          <MapMarker
            key={key}
            latitude={venue.addresscontact.latitude}
            longitude={venue.addresscontact.longitude}
          >
            <InfoWindow>
              <h1>{venue.title}</h1>
              {
                [
                venue.addresscontact.address1,
                venue.addresscontact.address2,
                venue.addresscontact.address3,
                venue.addresscontact.town,
                venue.addresscontact.town,
                venue.addresscontact.postcode
                ].filter(address=>!!address).map((address, key)=><div key={key}>{address}</div>)
              }
            </InfoWindow>
          </MapMarker>
        )}
      </Map>
    </MapWrapper>
  )
}

export default VenueMap
