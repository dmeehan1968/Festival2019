import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'

// TODO: Remove fontawesome when last reference removed
import { library } from '@fortawesome/fontawesome-svg-core'
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
import { gridSVG, heartSVG, mapSVG } from 'app/svg'

const TabLabel = styled.div`
  font-size: ${({theme: { textSm }}) => textSm}
`

const TabBarItem = styled(Link)`
  height: 100%;
  display: block;
  position: relative;
  background: url(${p=>`data:image/svg+xml;utf8,${p.svg({ fill: p.theme.colorBrandOrange })}`});
  background-position: top center;
  background-repeat: no-repeat;
  background-size: ${p=>p.theme.textXxl};

  & > :last-child {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 1em;
  }
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
            <TabBarItem svg={gridSVG} to="/">
              <TabLabel>Events</TabLabel>
            </TabBarItem>
            <TabBarItem svg={mapSVG} to="/map">
              <TabLabel>Map</TabLabel>
            </TabBarItem>
            <TabBarItem svg={heartSVG} to="/favourites">
              <TabLabel>Favourites</TabLabel>
            </TabBarItem>
          </TabBar>
        </footer>
      </div>
    </ThemeProvider>
  )
}
