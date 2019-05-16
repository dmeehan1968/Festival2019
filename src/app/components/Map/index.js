import React, { useState, useEffect } from 'react'
import ReactMap, { Popup, NavigationControl } from 'react-map-gl'
import { NavigationControlWrapper } from './styles'
import WebMercatorViewport from 'viewport-mercator-project'
import useIsClient from 'app/helpers/useIsClient'
import styled from 'styled-components'

const WarningMessage = styled.div`
  display: grid;
  height: 100%;
  justify-content: center;
  align-content: center;
`

export default ({
  children,
  bounds,
  latitude,
  longitude,
  zoom = 8,
  height = 400,
  width = "100%",
  popup,
  setPopup = () => console.log('Map: no popup handler defined'),
  ...otherProps,
}) => {

  const isClient = useIsClient()

  const center = {
    longitude: bounds.minLng + ((bounds.maxLng - bounds.minLng) / 2),
    latitude: bounds.minLat + ((bounds.maxLat - bounds.minLat) / 2),
  }

  const [ viewport, setViewport ] = useState({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: zoom,
  })

  useEffect(() => {

    if (!viewport.height || !viewport.width) {
      return
    }

    const expand=0.005
    const { latitude, longitude, zoom } = new WebMercatorViewport({ height: viewport.height, width: viewport.width })
      .fitBounds([ [ bounds.minLng-expand, bounds.minLat-expand ], [ bounds.maxLng+expand, bounds.maxLat+expand ] ], {padding: 100})

    setViewport({
      ...viewport,
      latitude,
      longitude,
      zoom,
    })

  }, [ bounds, viewport.height, viewport.width ])

  if (isClient && ReactMap.supported()) {
    return (
      <ReactMap
        {...viewport}
        {...otherProps}
        height={height}
        width={width}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={viewport => setViewport(viewport)}
        onClick={() => setPopup(null)}
      >
        {children}

        {popup &&
          <Popup
            latitude={popup.latitude}
            longitude={popup.longitude}
            closeOnClick={false}
            closeButton={false}
          >
            {popup.content}
          </Popup>
        }

        <NavigationControlWrapper>
          <NavigationControl onViewportChange={viewport => setViewport(viewport)}/>
        </NavigationControlWrapper>

      </ReactMap>
    )
  } else {
    return (
      <WarningMessage>
        {ReactMap.supported() &&
          <span suppressHydrationWarning={true}>Loading Map...</span>
          ||
          <span>Maps are not supported on your browser</span>
        }
      </WarningMessage>
    )
  }
}
