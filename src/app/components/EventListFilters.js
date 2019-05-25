import React, { useState, useMemo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import stringifyClassnames from 'app/helpers/stringifyClassnames'
import CheckboxGroup from 'app/components/CheckboxGroup'
import DateTime from 'app/components/DateTime'

const EventListFilters = ({
  className,
  filters,
  dates,
  disciplines,
  regions,
  setRegionFilter,
  setDisciplineFilter,
  setDateFilter,
  onSubmit,
}) => {

  const [ selectedRegions, setSelectedRegions ] = useState(filters.regions)
  const [ selectedDisciplines, setSelectedDisciplines ] = useState(filters.disciplines)
  const [ selectedDates, setSelectedDates ] = useState(filters.dates)

  const handleSubmit = (e) => {
    e.preventDefault()
    setRegionFilter(selectedRegions)
    setDisciplineFilter(selectedDisciplines)
    setDateFilter(selectedDates)
    onSubmit()
  }

  const handleRegionChange = (id, selected) => {
    if (selected) {
      setSelectedRegions([ ...new Set([ ...selectedRegions, id ]) ])
    } else {
      setSelectedRegions(selectedRegions.filter(region => region !== id))
    }
  }

  const handleRegionSelect = (evt, all) => {
    evt.preventDefault()
    setSelectedRegions(all ? regions.map(r=>r.id) : [])
  }

  const handleDisciplineChange = (id, selected) => {
    if (selected) {
      setSelectedDisciplines([ ...new Set([ ...selectedDisciplines, id ]) ])
    } else {
      setSelectedDisciplines(selectedDisciplines.filter(discipline => discipline !== id))
    }
  }

  const handleDisciplineSelect = (evt, all) => {
    evt.preventDefault()
    setSelectedDisciplines(all ? disciplines.map(d=>d.id) : [])
  }

  const handleDateChange = (id, selected) => {
    if (selected) {
      setSelectedDates([ ...new Set([ ...selectedDates, id ])])
    } else {
      setSelectedDates(selectedDates.filter(date => date !== id))
    }
  }

  const handleDateSelect = (evt, all) => {
    evt.preventDefault()
    setSelectedDates(all ? dates.map(d=>d.id) : [])
  }

  const formatDate = (date) => {
    return <DateTime date={date} format="EEE d MMM yyyy" />
  }

  return (
    <form className={className} onSubmit={handleSubmit}>
      <CheckboxGroup
        className="options"
        title="Regions"
        options={regions}
        selected={selectedRegions}
        onChange={handleRegionChange}
        onSelectAll={e => handleRegionSelect(e, true)}
        onSelectNone={e => handleRegionSelect(e, false)}
      />
      <CheckboxGroup
        className="options"
        title="Disciplines"
        options={disciplines}
        selected={selectedDisciplines}
        onChange={handleDisciplineChange}
        onSelectAll={e => handleDisciplineSelect(e, true)}
        onSelectNone={e => handleDisciplineSelect(e, false)}
      />
      <CheckboxGroup
        className="options"
        title="Dates"
        options={dates}
        selected={selectedDates}
        onChange={handleDateChange}
        labelKey="date"
        labelFormat={formatDate}
        onSelectAll={e => handleDateSelect(e, true)}
        onSelectNone={e => handleDateSelect(e, false)}
      />
      <input type="submit" value="Apply" />
    </form>
  )
}

const mapStateToProps = state => ({
  filters: state.filters,
  dates: state.dates,
  disciplines: state.disciplines,
  regions: state.regions,
})

import * as actionCreators from 'app/ducks/filters'
const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export const ConnectedEventListFilters = connect(mapStateToProps, mapDispatchToProps)(EventListFilters)

export default styled(ConnectedEventListFilters)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: ${p=>p.theme.spaceSm};
  grid-row-gap: ${p=>p.theme.spaceSm};

  .options {

    background-color: ${p=>p.theme.colorForeground};
    border: ${p=>p.theme.lineXs} solid ${p=>p.theme.colorForeground};
    box-shadow: ${p=>p.theme.lineXs} ${p=>p.theme.lineXs} ${p=>p.theme.lineLg} 0 ${p=>p.theme.colorTint};
    padding: ${p=>p.theme.spaceXs} ${p=>p.theme.spaceXs} ${p=>p.theme.spaceXs} ${p=>p.theme.spaceXs};
    margin-top: ${p=>p.theme.spaceMd};
    margin-bottom: ${p=>p.theme.spaceMd};

    legend {
      padding: ${p=>p.theme.spaceXs} ${p=>p.theme.spaceSm};
      border: ${p=>p.theme.lineXs} solid ${p=>p.theme.colorForeground};
      box-shadow: ${p=>p.theme.lineXs} ${p=>p.theme.lineXs} ${p=>p.theme.lineLg} 0 ${p=>p.theme.colorTint};
      background-color: ${p=>p.theme.colorForeground};
    }

    label {
      padding-left: ${p=>p.theme.spaceSm};
    }

    label:after {
      content: "";
      display: block;
    }
  }

`
