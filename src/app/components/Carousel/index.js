import React, { useState, useEffect } from 'react'

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
    const timeout = setTimeout(() => {
      const newIndex = activeIndex + 1
      setActiveIndex(newIndex < React.Children.count(children) ? newIndex : 0)
    }, delay)
    return () => {
      clearTimeout(timeout)
    }
  })
  return (
    <ControlledCarousel
      {...props}
      activeIndex={activeIndex}
      children={children}
      isClient={isClient}
    />
  )
}
