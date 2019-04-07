import React from 'react'

import styles from './NavBar.less'

export default ({
  title = 'No Title',
  className = styles.container,
  classNameLeftAction = styles.leftAction,
  classNameRightAction = styles.rightAction,
  classNameTitle = styles.title,
}) => {
  return (
    <div className={className}>
      <div id="nav-bar-left-action" className={classNameLeftAction}/>
      <div className={classNameTitle}>{title}</div>
      <div id="nav-bar-right-action" className={classNameRightAction} />
    </div>
  )
}
