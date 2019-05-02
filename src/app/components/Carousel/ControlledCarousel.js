import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div.withConfig({displayName: 'Wrapper'})`
  width: ${p=>p.width ? `${p.width}px` : '100%' };
  height: ${p=>p.height ? `${p.height}px` : '100%' };
  display: grid;
  justify-items: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  line-height: 0;
`

const Slide = styled.div.withConfig({displayName: 'Slide'})`

  position: absolute;
  transition: transform ${p=>`${p.speed}ms` || '1000ms'};
  transform: translateX(${p=>p.offsetX}px);

`

export const ControlledCarousel = ({
  height = 0,
  width = 0,
  activeIndex = 0,
  children,
  speed = 1000,
  columnGap = 20,
  isClient = true,
  ...props,
}) => {
  activeIndex = Math.min(Math.max(0, activeIndex), React.Children.count(children)-1)
  const widths = React.Children.map(children, (child, index) => {
    const imageRatio = child.props.width / child.props.height
    return Math.round(height * imageRatio)
  })
  return (
    <Wrapper
      {...props}
      height={height}
      width={width}
    >
      {React.Children.count(children) < 1 &&
        <div>There is no content to display</div>
      }
      {isClient && React.Children.map(children, (child, index)=> {
        const offset = index - activeIndex

        const boostActiveIndex = offset > 0 ? 1 : 0
        const boostIndex = offset < 0 ? 1 : 0
        const lowerBound = Math.min(activeIndex + boostActiveIndex, index + boostIndex)
        const upperBound = Math.max(activeIndex + boostActiveIndex, index + boostIndex)
        const intermediates = widths.slice(lowerBound, upperBound)
        const sum = (acc, value) => acc+value
        let offsetX = intermediates.reduce(sum, 0)
        offsetX += (widths[index] - ((widths[index] - widths[activeIndex])/2)) + (columnGap * Math.abs(offset))
        offsetX *= Math.sign(offset)

        return (
          <Slide
            className={offset === 0 ? 'active' : ''}
            speed={speed}
            offsetX={offsetX}
          >
            {React.cloneElement(
              child,
              {
                ['data-carousel-height']: height,
                ['data-carousel-width']: widths[index],
              }
            )}
          </Slide>
        )
      })}
      <noscript>
        {children}
      </noscript>
    </Wrapper>
  )
}

export default ControlledCarousel
