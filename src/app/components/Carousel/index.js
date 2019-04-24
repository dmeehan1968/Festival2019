import React from 'react'
import styled from 'styled-components'

const NavigationWrapper = styled.nav`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-template-areas: "prev empty next";
  grid-template-columns: minmax(8em,1fr) 1fr minmax(8em,1fr);
`

export const Navigation = ({
  count = 0,
}) => {
  if (count <= 1) {
    return null
  }
  return (
    <NavigationWrapper>
      <div
        className="previous"
        style={{
          gridArea: 'prev',
          justifySelf: 'start',
          paddingLeft: '1em',
        }}
      >
        Previous
      </div>
      <div
        className="next"
        style={{
          gridArea: 'next',
          justifySelf: 'end',
          paddingRight: '1em',
        }}
      >
        Next
      </div>
    </NavigationWrapper>
  )
}

export default ({
  height = 0,
  width = 0,
  children,
  placeholder = 'There is no carousel content to display'
}) => {
  return (
    <div
      style={{
        height: `${height}px`,
        lineHeight: `${height}px`,
        width: `${width}px`,
        backgroundColor: 'rgba(255,0,0,0.2)',
        display: 'grid',
        position: 'relative',
      }}
    >
      {(!children || React.Children.count(children) < 1) && (
        <div
          className="placeholder"
          style={{
            justifySelf: 'center',
            alignSelf: 'center',
          }}
        >
          {placeholder}
        </div>
      )}
      {children && React.Children.map(children, (child, key) => {
        return (
          <React.Fragment key={key}>
            {child}
          </React.Fragment>
        )
      })}
      <Navigation count={React.Children.count(children)} />
    </div>
  )
}
