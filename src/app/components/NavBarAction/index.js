import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import useIsClient from 'app/helpers/useIsClient'

export default ({ id, children }) => {
  const isClient = useIsClient()

  if (isClient) {
    return ReactDOM.createPortal(children, document.getElementById(id))
  }

  return null
}
