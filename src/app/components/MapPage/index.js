import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'

import styles from './MapPage.less'

const MapPage = ({
  venues,
  google,
  className = styles.container,
}) => {

  const repositionMap = (mapProps, map) => {

    const bounds = new google.maps.LatLngBounds()

    venues.forEach(venue => bounds.extend({ lat: venue.addresscontact.latitude, lng: venue.addresscontact.longitude }))

    map.fitBounds(bounds)
  }

  return (
    <div className={className}>
      <Helmet>
        <title>Venues</title>
      </Helmet>
      <div>
        <Map
          google={google}
          onReady={repositionMap}
        >
          {venues.map(({ title, addresscontact: { latitude, longitude } }, key) => {
            return <Marker
              key={key}
              title={title}
              position={{ lat: latitude, lng: longitude }}>
            </Marker>

          })}
        </Map>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  venues: state.venues,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
  apiKey: 'AIzaSyDc0ag8mzraPfAodcKn8WypgMPJmFz6s0Q',
})(MapPage))
