import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import EventGrid from 'app/components/EventGrid'
import useIsClient from 'app/helpers/useIsClient'

import styles from './FavouriteEventsList.less'

const FavouriteEventsList = ({
  events = [],
  favourites = [],
  className = styles.container,
}) => {
  const isClient = useIsClient()

  return (
    <div className={className}>
      <EventGrid events={isClient && events.filter(event => !!favourites.find(fav=>fav===event.id))} />
    </div>
  )
}

const mapStateToProps = state => ({
  events: state.events,
  favourites: state.favourites,
})

export default connect(mapStateToProps)(FavouriteEventsList)
