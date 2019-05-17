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
    const id = `infoWindow_${index}`
    const infoWindow = new window.google.maps.InfoWindow({
      content: `<div id="${id}" />`,
      position: position,
    })

    infoWindow.addListener('domready', () => {
      document.getElementById(id).appendChild(elements[index])
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
    setElements(elements)
  }

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.defer = true
      script.src = `https://maps.google.com/maps/api/js?key=${apiKey}`
      const body = document.getElementsByTagName('body')[0]
      body.appendChild(script)
      script.addEventListener('load', e => {
        onLoadScript()
      })
    } else {
      onLoadScript()
    }
  })

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
