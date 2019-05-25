import React from 'react'
import styled from 'styled-components'
import { Route } from 'react-router-dom'

export const Status = ({
  code,
  children,
}) => {
  return (
    <Route render={({ staticContext }) => {
      if (staticContext) staticContext.status = 404
      return children
    }} />
  )
}

export const NotFound = ({
  className,
  location,
}) => {
  return (
    <div className={className}>
      <Status code={404}>
        <h1>Not Found</h1>
        <p>The requested page (<code>{location.pathname}</code>) could not be found.</p>
      </Status>
    </div>
  )
}

export default styled(NotFound)`
  padding: ${p=>p.theme.spaceMd};
  text-align: center;
`
