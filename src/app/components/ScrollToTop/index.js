import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'

export const ScrollToTop = ({
  location,
}) => {
  useEffect(() => {
    window.scroll(0, 0)
  }, [ location.pathname ])
  return null
}

export default withRouter(ScrollToTop)
