import React, { useState, useEffect, useRef } from 'react'
import useInterval from 'app/helpers/useInterval'
import ControlledCarousel from './ControlledCarousel'

export default ({
  delay = 2000,
  children,
  ...props,
}) => {
  const [ activeIndex, setActiveIndex ] = useState(0)
  const [ isClient, setIsClient ] = useState(false)

  useEffect(() => {
    setIsClient(true)
  })

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
