import React, { useState, useEffect } from 'react'
import ReactDOM, { render } from 'react-dom'

export const GoogleMap = ({
  mapId = 'map',
  apiKey,
  defaultZoom,
  defaultCenter,
  height = '100%',
  onMapLoad = () => {},
  children,
}) => {

  const [ elements, setElements ] = useState([])

  const createInfoWindow = (map, position, index) => {
    const infoWindow = new window.google.maps.InfoWindow({
      content: elements[index],
      position: position,
    })

    infoWindow.open(map)
  }

  const onLoadScript = () => {
    const map = new window.google.maps.Map(document.getElementById(mapId), {
      center: defaultCenter,
      zoom: defaultZoom,
    })
    onMapLoad(window.google, map)
    React.Children.forEach(children, (child, index) => {
      const position = { lat: child.props.lat, lng: child.props.lng }
      const marker = new window.google.maps.Marker({ position, map })
      if (!elements[index]) {
        elements[index] = document.createElement('div')
      }
      marker.addListener('click', () => { createInfoWindow(map, position, index) })
    })
    setElements([...elements])  // new array or render doesn't happen
  }

  useEffect(() => {

    const scriptjs = require('scriptjs')
    scriptjs(`https://maps.google.com/maps/api/js?key=${apiKey}`, () => {
      onLoadScript()
    })
    
  }, [])

  return <GoogleMapRender mapId={mapId} height={height} elements={elements} children={children} />

}

const GoogleMapRender = ({
  mapId,
  height,
  elements,
  children,
}) => {

  return <div style={{ height }}  id={mapId}>
    {
      React.Children.map(children, (child, index) => {
        if (elements[index]) {
          return ReactDOM.createPortal(child, elements[index])
        }
      })
    }
  </div>
}
export default GoogleMap
