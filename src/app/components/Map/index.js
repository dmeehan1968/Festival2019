import React, { useState, useEffect } from 'react'
import useIsClient from 'app/helpers/useIsClient'
import styled from 'styled-components'
import {
  StaticGoogleMap,
  Marker as StaticMarker,
} from 'react-static-google-map';

export const MapMarker = ({
  latitude,
  longitude,
}) => {
  return null
}



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

  return (
    <StaticGoogleMap size="400x400" scale="1" apiKey={process.env.GoogleMapsAPI}>
      {React.Children.map(children, (child, key) => {
        return <StaticMarker key={key} location={`${child.props.latitude},${child.props.longitude}`} />
      })}
    </StaticGoogleMap>
  )
}
