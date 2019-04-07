import React from 'react'
import { Helmet } from 'react-helmet'
import FavouriteEventsList from 'app/components/FavouriteEventsList'

import styles from './FavouritesPage.less'

export default () => {
  return (
    <div className={styles.container}>
      <Helmet>
        <title>Favourites</title>
      </Helmet>
      <h1>Favourites</h1>
      <FavouriteEventsList />
    </div>
  )
}
