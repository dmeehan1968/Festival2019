import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setTextFilter } from 'app/ducks'
import { Helmet } from 'react-helmet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

import NavBarAction from 'app/components/NavBarAction'
import SearchBar from 'app/components/SearchBar'
import EventListFilters from 'app/components/EventListFilters'
import FilteredEventList from 'app/components/FilteredEventList'

const useDebounce = (value, callback, delay = 500) => {
  const [debouncedSearchText, setDebouncedSearchText] = useState(value)
  useEffect(() => {
    const timeout = setTimeout(() => {
      callback(debouncedSearchText)
    }, delay)

    return () => {
      clearTimeout(timeout)
    }
  }, [debouncedSearchText])

  return [ debouncedSearchText, setDebouncedSearchText ]
}

const Menu = (props) => {
  return (
    <FontAwesomeIcon icon="bars" { ...props } />
  )
}

const Hamburger = styled(Menu)`
  color: ${p=>p.theme.colorBrandOrange};
`

const EventsPage = ({
  setTextFilter,
  textFilter,
  className,
}) => {
  const [showFilters, setShowFilters] = useState(false)
  const [debouncedSearchText, setDebouncedSearchText] = useDebounce(textFilter, setTextFilter)

  return (
    <div className={className}>
      <Helmet title="Events" />
      {/* <NavBarAction id="nav-bar-right-action">
        <Hamburger icon="bars" onClick={()=>setShowFilters(!showFilters)}/>
        {showFilters &&
          <EventListFilters
        onSubmit={() => setShowFilters(false)}
          />
        }
        <SearchBar
          searchText={debouncedSearchText}
          onClickFilterToggle={() => setShowFilters(!showFilters)}
          onSearch={(e) => {
        setDebouncedSearchText(e.target.value)
          }}
        />
    </NavBarAction> */}
      <h1>Events</h1>
      <FilteredEventList />
    </div>
  )
}

const mapStateToProps = state => ({
  textFilter: state.filters.text,
})

const mapDispatchToProps = dispatch => ({
  setTextFilter: text => dispatch(setTextFilter(text))
})

const ConnectedEventPage = connect(mapStateToProps, mapDispatchToProps)(EventsPage)

export default styled(ConnectedEventPage)`
  padding: ${p=>p.theme.spaceMd};
  height: 100%;
  overflow: auto;
`
