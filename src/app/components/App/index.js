import React, { useEffect } from 'react'
import { Link, Route, Switch, withRouter } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons/faSlidersH'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { faTh } from '@fortawesome/free-solid-svg-icons/faTh'
import { faMapMarker } from '@fortawesome/free-solid-svg-icons/faMapMarker'
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons/faMapMarkedAlt'

library.add(faBars)
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
import ScrollToTop from 'app/components/ScrollToTop'

import styled, { ThemeProvider } from 'styled-components'
import * as designSystem from 'styles/designSystem.js'
import 'styles/base.less'

import _GoogleAnalytics from 'app/components/GoogleAnalytics'
const GoogleAnalytics = withRouter(_GoogleAnalytics)

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
  width: 100vw;
  height: ${p=>p.theme.headerHeight};

  ${NavBarTitle} {
    color: ${p=>p.theme.colorBrandOrange};
  }
`

export const App = ({
  className,
}) => {
  return (
    <div className={className}>
      <GoogleAnalytics />
      <header>
        <FestivalNavBar title="10 Parishes Festival" />
      </header>
      <main>
        <ScrollToTop />
        <Switch>
          <Route exact path="/" component={EventsPage} />
          <Route exact path="/map" component={MapPage} />
          <Route exact path="/favourites" component={FavouritesPage} />
          <Route path="/events/:id" component={RoutedEventPage} />
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
  )
}

const StyledApp = styled(App)`

  height: 100vh;

  header, footer {
    position: fixed;
    width: 100vw;
    z-index: 1;
  }

  header {
    top: 0;
  }

  main {
    height: 100%;
    box-sizing: border-box;
    padding-top: ${p=>p.theme.headerHeight};
    padding-bottom: ${p=>p.theme.footerHeight};
  }

  footer {
    bottom: 0;
  }

`

export default () => {
  return (
    <ThemeProvider theme={designSystem}>
      <StyledApp />
    </ThemeProvider>
  )
}
