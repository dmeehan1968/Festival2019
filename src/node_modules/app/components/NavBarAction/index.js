import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

export default ({ id, children }) => {
  const [ isClient, setIsClient ] = useState(false)
  useEffect(() => { setIsClient(true) })

  if (isClient) {
    return ReactDOM.createPortal(children, document.getElementById(id))
  }

  return null
}
