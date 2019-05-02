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
  transition: transform ${p=>p.speed || '1s'};
  transform: translateX(${p=>p.offsetX}px);

`

export const ControlledCarousel = ({
  height = 0,
  width = 0,
  activeIndex = 0,
  children,
  speed = '1s',
  columnGap = 20,
  isClient = true,
  ...props,
}) => {
  activeIndex = Math.min(Math.max(0, activeIndex), React.Children.count(children)-1)
  const widths = React.Children.map(children, (child, index) => {
    const imageRatio = child.props.width / child.props.height
    return Math.round(height * imageRatio)
  })
  console.log(widths);
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
        // const offsetX = (computedWidth+columnGap) * offset
        /*
         400     X =
         300 <-- X = 0
         200     X =
        */
        let offsetX = 0

        if (offset > 0) {
          const intermediates = widths.slice(Math.min(activeIndex+1, index), Math.max(activeIndex+1, index))
          console.log(index, activeIndex, intermediates);
          offsetX = intermediates.reduce((acc, width) => acc+width, 0)
          offsetX += (widths[index] - ((widths[index] - widths[activeIndex])/2)) + (columnGap * offset)
        }

        if (offset < 0) {
          const intermediates = widths.slice(Math.min(activeIndex, index+1), Math.max(activeIndex, index+1))
          console.log(index, activeIndex, intermediates);
          offsetX = intermediates.reduce((acc, width) => acc+width, 0)
          offsetX += (widths[index] - ((widths[index] - widths[activeIndex])/2)) + (columnGap * Math.abs(offset))
          offsetX *= -1
        }


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
