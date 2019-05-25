import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import useIsClient from 'app/helpers/useIsClient'

// import EventList from 'app/components/EventList'
import EventGrid from 'app/components/EventGrid'

import styled from 'styled-components'

const filterEvent = (filters, event) => {

  const intersection = (arr1, arr2, comparitor = () => true) => {
    return arr1.filter(item1 => arr2.filter(item2 => comparitor(item1, item2)).length > 0)
  }

  if (filters.regions.length > 0 && event.venue && event.venue.regions && event.venue.regions.length > 0) {

    if (intersection(
      event.venue.regions,
      filters.regions,
      (region, regionId) => region.id === regionId
    ).length === 0) {
      return false
    }

  }

  if (filters.disciplines.length > 0 && event.disciplines.length > 0) {

    if (intersection(
      event.disciplines,
      filters.disciplines,
      (discipline, disciplineId) => discipline.id === disciplineId
    ).length === 0) {
      return false
    }

  }

  if (filters.dates.length > 0 && event.opening_times.length > 0) {

    if (event.opening_times.filter(open => {
        return filters.dates.filter(date => open.start.hasSame(date, 'day')).length > 0
      })
      .length === 0) {
      return false
    }

  }

  if (filters.text.length > 0) {
    const text = filters.text.toLowerCase().trim()
    return [
      event.title,
      event.subtitle,
      event.shortdesc,
    ].reduce((accum, value) => accum || (value || '').toLowerCase().includes(text), false)
  }

  return true

}

const FilteredEventList = ({
  events,
  filters,
  dates,
  disciplines,
  regions,
  className,
 }) => {
  filters = {
    ...filters,
    dates: filters.dates.map(dateId => {
      const date = dates.find(date => date.id === dateId)
      if (date) {
        return date.date
      }
      throw new Error('no matching date')
    })
  }

  const isClient = useIsClient()

  const filteredEvents = isClient && events.filter(filterEvent.bind(null, filters)) || events
  const resultText = isClient && [
    filteredEvents.length < events.length && (`Showing ${filteredEvents.length} results (from ${events.length} events)`),
    filters.text && (`for text "${filters.text}"`),
    filters.dates.length < dates.length && (`${filters.dates.length} of ${dates.length} dates selected`),
    filters.disciplines.length < disciplines.length && (`${filters.disciplines.length} of ${disciplines.length} disciplines selected`),
    filters.regions.length < regions.length && (`${filters.regions.length} of ${regions.length} regions selected`),
  ].filter(text => !!text).join(', ')

  return (
    <div className={className}>
      {/* {resultText && <p>{resultText}</p>} */}

      <EventGrid events={filteredEvents} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  events: state.events,
  filters: state.filters,
  dates: state.dates,
  disciplines: state.disciplines,
  regions: state.regions,
})

const mapDispatchToProps = (dispatch) => ({})

export const ConnectedFilteredEventList = connect(mapStateToProps, mapDispatchToProps)(FilteredEventList)

export default styled(ConnectedFilteredEventList)`
  height: 100%;
`
