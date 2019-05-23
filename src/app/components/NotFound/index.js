import React from 'react'

import styled from 'styled-components'

export const NotFound = ({
  className,
}) => {
  return (
    <div className={className}>
      <h1>Not Found</h1>
      <p>The requested page could not be found.</p>
    </div>
  )
}

export default styled(NotFound)`

`
