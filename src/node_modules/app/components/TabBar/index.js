import React from 'react'

import styles from './TabBar.less'

export default ({
  children,
  className = styles.container
 }) => {
  return (
    <nav className={className}>
      <ul>
        {React.Children.map(children, (child, key) => (<li key={key}>{child}</li>))}
      </ul>
    </nav>

  )
}
