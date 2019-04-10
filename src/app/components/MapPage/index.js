import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import VenueMap from 'app/components/VenueMap'

import styles from './MapPage.less'

const MapPage = ({
  venues,
}) => {

  return (
    <div className={styles.container}>
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

export default connect(mapStateToProps, mapDispatchToProps)(MapPage)
