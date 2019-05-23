import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import VenueMap from 'app/components/VenueMap'

import styled from 'styled-components'

export const MapPage = ({
  venues,
  className,
}) => {

  return (
    <div className={className}>
      <Helmet>
        <title>Venues</title>
      </Helmet>

      <VenueMap venues={venues} height="100%" />
    </div>
  )
}

const mapStateToProps = state => ({
  venues: state.venues,
})

const mapDispatchToProps = dispatch => ({

})

export const ConnectedMapPage = connect(mapStateToProps, mapDispatchToProps)(MapPage)

export default styled(ConnectedMapPage)`
  height: 100%;
`
