import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

import NavBar from 'app/components/NavBar'
import TabBar from 'app/components/TabBar'
import EventsPage from 'app/components/EventsPage'
import MapPage from 'app/components/MapPage'
import FavouritesPage from 'app/components/FavouritesPage'
import NotFound from 'app/components/NotFound'
import RoutedEventPage from 'app/components/RoutedEventPage'

import styles from './App.less'

export default ({
  className = styles.container,
  classNameNavBar = styles.navBar,
}) => {
  return (
    <div className={className}>
      <header>
        <NavBar title="10 Parishes Festival" className={classNameNavBar} classNameTitle={styles.title} />
      </header>
      <main>
        <Switch>
          <Route exact path="/" component={EventsPage} />
          <Route exact path="/map" component={MapPage} />
          <Route exact path="/favourites" component={FavouritesPage} />
          <Route exact path="/events/:id" component={RoutedEventPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <footer>
        <TabBar className={styles.tabBar}>
          <Link to="/">
            <FontAwesomeIcon icon="th" />
            <div>Events</div>
          </Link>
          <Link to="/map">
            <FontAwesomeIcon icon="map-marked-alt" />
            <div>Map</div>
          </Link>
          <Link to="/favourites">
            <FontAwesomeIcon icon="heart" />
            <div>Favourites</div>
          </Link>
        </TabBar>
      </footer>
    </div>
  )
}
