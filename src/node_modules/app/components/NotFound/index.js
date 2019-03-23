import React from 'react'

import styles from './NotFound.less'

export default () => {
  return (
    <div className={styles.container}>
      <h1>Not Found</h1>
      <p>The requested page could not be found.</p>
    </div>
  )
}
