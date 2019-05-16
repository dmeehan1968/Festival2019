import React, { useState, useEffect } from 'react'
import useIsClient from 'app/helpers/useIsClient'
import styled from 'styled-components'

import {
  StaticGoogleMap,
  Marker as StaticMarker,
} from 'react-static-google-map';

import { compose, withProps } from 'recompose'

import {
  GoogleMap,
  Marker as GoogleMarker,
  withGoogleMap,
  withScriptjs,
} from '@syncromatics/react-google-maps'

import { InfoBox } from '@syncromatics/react-google-maps/lib/components/addons/InfoBox'

export const MapMarker = ({
  latitude,
  longitude,
}) => {
  return null
}

const _DynamicMap = ({
  latitude,
  longitude,
  zoom,
  children,
}) => {
  return (
    <GoogleMap
      defaultZoom={zoom}
      defaultCenter={{ lat: latitude, lng: longitude }}>
      {React.Children.map(children, (child, key) => {
        return (
          <GoogleMarker key={key} position={{ lat: child.props.latitude, lng: child.props.longitude }}>
            <InfoBox>
              {child.props.children}
            </InfoBox>
          </GoogleMarker>
        )
      })}
    </GoogleMap>
  )
}

const DynamicMap = compose(
  withProps({
     googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.GoogleMapsAPI}&libraries=geometry,drawing,places`,
     loadingElement: <div style={{ height: `100%` }} />,
     containerElement: <div style={{ height: `100%` }} />,
     mapElement: <div style={{ height: `100%` }} />,
   }),
   withScriptjs,
   withGoogleMap
)(_DynamicMap)

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

  if (isClient) {

    return (
      <div style={{ height }}>
        <DynamicMap
          latitude={latitude}
          longitude={longitude}
          zoom={zoom}
        >
          {children}
        </DynamicMap>
      </div>
    )

  } else {
    return (
      <StaticGoogleMap size="400x400" scale="1" apiKey={process.env.GoogleMapsAPI}>
        {React.Children.map(children, (child, key) => {
          return <StaticMarker key={key} location={`${child.props.latitude},${child.props.longitude}`} />
        })}
      </StaticGoogleMap>
    )
  }
}
