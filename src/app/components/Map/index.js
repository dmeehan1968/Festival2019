import React, { useState } from 'react'
import ReactMap, { Popup, NavigationControl } from 'react-map-gl'
import { NavigationControlWrapper } from './styles'

export default ({
  children,
  latitude,
  longitude,
  zoom = 11,
  popup,
  setPopup = () => console.log('Map: no popup handler defined'),
  ...otherProps,
}) => {
  const [ viewport, setViewport ] = useState({
    latitude: latitude,
    longitude: longitude,
    zoom: zoom,
  })

  return (
    <ReactMap
      {...viewport}
      {...otherProps}
      width="100%"
      height="100%"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={viewport => setViewport(viewport)}
      onClick={() => setPopup(null)}
    >
      {children}

      {popup &&
        <Popup
          latitude={latitude}
          longitude={longitude}
          closeOnClick={false}
          closeButton={false}
        >
          {popup}
        </Popup>
      }

      <NavigationControlWrapper>
        <NavigationControl onViewportChange={viewport => setViewport(viewport)}/>
      </NavigationControlWrapper>

    </ReactMap>
  )
}
