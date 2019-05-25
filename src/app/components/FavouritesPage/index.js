import React from 'react'
import { Helmet } from 'react-helmet'
import FavouriteEventsList from 'app/components/FavouriteEventsList'

import styled from 'styled-components'

export const FavouritesPage = ({
  className,
}) => {
  return (
    <div className={className}>
      <Helmet>
        <title>Favourites</title>
      </Helmet>
      <h1>Favourites</h1>
      <FavouriteEventsList />
    </div>
  )
}

export default styled(FavouritesPage)`
  padding: ${p=>p.theme.spaceMd};
  height: 100%;
  overflow: auto;
`
