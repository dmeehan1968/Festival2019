import React from 'react'
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

  &.active {
    transform: translateX(0);
  }

  &.previous {
    transform: translateX(-${p=>p.offset || 1000}px);
  }

  &.next {
    transform: translateX(${p=>p.offset || 1000}px);
  }
`

export const ControlledCarousel = ({
  height = 0,
  width = 0,
  activeIndex = 0,
  children,
  speed = '1s',
  ...props,
}) => {
  activeIndex = Math.min(Math.max(0, activeIndex), React.Children.count(children)-1)
  const activeChild = React.Children.toArray(children)[activeIndex]
  return (
    <Wrapper
      {...props}
      height={height}
      width={width}
    >
      {React.Children.count(children) < 1 &&
        <div>There is no content to display</div>
      }
      {React.Children.map(children, (child, key)=> {
        return (
          <Slide
            className={key < activeIndex ? 'previous' : key > activeIndex ? 'next' : 'active'}
            offset={width}
            speed={speed}
          >
            {React.cloneElement(
              child,
              {
                ['data-carousel-height']: height,
                ['data-carousel-width']: width,
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
