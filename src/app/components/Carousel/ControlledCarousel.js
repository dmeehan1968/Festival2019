import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div.withConfig({displayName: 'Wrapper'})`
  width: ${p=>p.width ? `${p.width}px` : '100%' };
  height: ${p=>p.height ? `${p.height}px` : '100%' };
  display: grid;
  justify-items: center;
  align-items: center;
  overflow: hidden;
`

export const ControlledCarousel = ({
  height = 0,
  width = 0,
  activeIndex = 0,
  children,
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
      {activeChild &&
        React.cloneElement(
          activeChild,
          {
            ['data-carousel-height']: height,
            ['data-carousel-width']: width,
          }
        )
      }
      <noscript>
        {children}
      </noscript>
    </Wrapper>
  )
}

export default ControlledCarousel
