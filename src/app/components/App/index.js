import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons/faSlidersH'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { faTh } from '@fortawesome/free-solid-svg-icons/faTh'
import { faMapMarker } from '@fortawesome/free-solid-svg-icons/faMapMarker'
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons/faMapMarkedAlt'

library.add(faHeart)
library.add(faSlidersH)
library.add(faSearch)
library.add(faTh)
library.add(faMapMarker)
library.add(faMapMarkedAlt)

import NavBar, { NavBarTitle } from 'app/components/NavBar'
import TabBar, { TabBarItem } from 'app/components/TabBar'
import EventsPage from 'app/components/EventsPage'
import MapPage from 'app/components/MapPage'
import FavouritesPage from 'app/components/FavouritesPage'
import NotFound from 'app/components/NotFound'
import RoutedEventPage from 'app/components/RoutedEventPage'

import styles from './App.less'
import styled, { ThemeProvider } from 'styled-components'
import * as designSystem from 'styles/designSystem.js'

const TabIcon = styled(FontAwesomeIcon)`
  font-size: ${p=>p.theme.textLg}
`
const TabLabel = styled.div`
  font-size: ${({theme: { textSm }}) => textSm}
`

const FestivalNavBar = styled(NavBar)`
  background-color: ${p=>p.theme.colorBrandBlue};
  line-height: ${p=>p.theme.headerHeight};
  padding: 0 ${p=>p.theme.spaceSm};
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100vw;
  height: ${p=>p.theme.headerHeight};

  ${NavBarTitle} {
    color: ${p=>p.theme.colorBrandOrange};
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
          <FestivalNavBar title="10 Parishes Festival" />
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
          <TabBar>
            <Link to="/">
              <TabBarItem icon={<TabIcon icon="th" />} label="Events" />
            </Link>
            <Link to="/map">
              <TabBarItem icon={<TabIcon icon="map-marked-alt" />} label="Map" />
            </Link>
            <Link to="/favourites">
              <TabBarItem icon={<TabIcon icon="heart" />} label="Favourites" />
            </Link>
          </TabBar>
        </footer>
      </div>
    </ThemeProvider>
  )
}
