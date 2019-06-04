import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styled from 'styled-components'

export const SearchBar = ({
  onClickFilterToggle = () => {},
  onSearch = () => {},
  searchText = '',
  className,
  searchIconClass = "search",
  filterIconClass = "sliders-h",
}) => {
  return (
    <section className={className}>
      <FontAwesomeIcon icon={searchIconClass} />
      <input type="search" placeholder="Search" onChange={onSearch} value={searchText}/>
      <a href="javascript:void(0);" onClick={onClickFilterToggle}>
        <FontAwesomeIcon icon={filterIconClass} />
      </a>
    </section>
  )
}

export default styled(SearchBar)`
  display: grid;
  grid-template-columns: ${p=>p.theme.textMd} calc(${p=>p.theme.textMd} * 10) ${p=>p.theme.textSm};
  grid-column-gap: ${p=>p.theme.spaceXxs};
  justify-content: end;
  align-items: center;
  width: 100%;
`
