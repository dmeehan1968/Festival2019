import React, { useState } from 'react'

import { MapWrapper, Pin, NavigationControlWrapper } from './styles'
import ReactMap, { Marker, Popup, NavigationControl } from 'react-map-gl'

export default ({ lat, lng, title }) => {
  if (!lat && !lng) {
    return <p>Map location not specified.</p>
  }

  const [ viewport, setViewport ] = useState({
    latitude: lat,
    longitude: lng,
    zoom: 10,
  })

  const [ popup, setPopup ] = useState(null)

  return (
    <MapWrapper>
      <ReactMap
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={viewport => setViewport(viewport)}
        onClick={() => setPopup(null)}
      >
        <Marker
          latitude={lat}
          longitude={lng}
          offsetLeft={-12}
          offsetTop={-29}
        >
          <Pin
            icon="map-marker"
            onClick={() => setPopup({ lat, lng, title })}
          />
        </Marker>

        {popup &&
          <Popup
            latitude={popup.lat}
            longitude={popup.lng}
            onClose={() => setPopup(null)}
            closeOnClick={false}
            closeButton={false}
          >
            {popup.title}
          </Popup>
        }

        <NavigationControlWrapper>
          <NavigationControl />
        </NavigationControlWrapper>
      </ReactMap>
    </MapWrapper>
  )
}
