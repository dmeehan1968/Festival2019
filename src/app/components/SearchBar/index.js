import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './SearchBar.less'

export default ({
  onClickFilterToggle = () => {},
  onSearch = () => {},
  searchText = '',
  className = styles.container,
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
