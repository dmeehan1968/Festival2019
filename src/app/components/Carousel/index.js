import React, { useState, useEffect, useRef } from 'react'
import useInterval from 'app/helpers/useInterval'
import useIsClient from 'app/helpers/useIsClient'
import ControlledCarousel from './ControlledCarousel'

export default ({
  delay = 2000,
  children,
  ...props,
}) => {
  const [ activeIndex, setActiveIndex ] = useState(0)
  const isClient = useIsClient()

  useInterval(() => {
    setActiveIndex(oldIndex => oldIndex < React.Children.count(children)-1 ? oldIndex+1 : 0)
  }, delay)

  return (
    <ControlledCarousel
      {...props}
      activeIndex={activeIndex}
      children={children}
      isClient={isClient}
    />
  )
}
