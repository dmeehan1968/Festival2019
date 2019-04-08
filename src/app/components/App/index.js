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
import styled, { ThemeProvider } from 'styled-components'
import * as designSystem from 'styles/designSystem.js'

const TabLabel = styled.div`
  font-size: ${({theme: { textSm }}) => textSm}
`

export default ({
  className = styles.container,
  classNameNavBar = styles.navBar,
}) => {
  return (
    <ThemeProvider theme={designSystem}>
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
              <TabLabel>Events</TabLabel>
            </Link>
            <Link to="/map">
              <FontAwesomeIcon icon="map-marked-alt" />
              <TabLabel>Map</TabLabel>
            </Link>
            <Link to="/favourites">
              <FontAwesomeIcon icon="heart" />
              <TabLabel>Favourites</TabLabel>
            </Link>
          </TabBar>
        </footer>
      </div>
    </ThemeProvider>
  )
}
