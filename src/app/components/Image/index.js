import React, { useState, useRef } from 'react'
import Waypoint from 'react-waypoint'
import styled from 'styled-components'

const PlaceholderWrapper = styled.div`
  background-color: red;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top left;
  width: 100%;
  height: auto;
  max-width: 100%;
`

const SvgWrapper = styled.svg`
  width: 100%;
  height: auto;
  max-width: 100%;
`

const ImgWrapper = styled.img`
  width: 100%;
  height: auto;
  max-width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`
const PlaceholderNoRef = ({
  height,
  width,
  getSrc,
  innerRef,
  lqip,
  ...props,
}) => {
  let renderedWidth, renderedHeight
  const svgRef = useRef(null)
  if (svgRef.current) {
    const rect = svgRef.current.getBoundingClientRect()
    renderedWidth = Math.round(rect.width)
    renderedHeight = Math.round(rect.height)
  }

  const src = getSrc(renderedWidth)
  return (
    <PlaceholderWrapper
      ref={innerRef}
      style={{
        backgroundImage: lqip && `url("${lqip}")`
      }}
    >
      <SvgWrapper
        ref={svgRef}
        width={width}
        height={height}
      />
      {src &&
        <ImgWrapper
          src={src}
          {...props}
          width={width}
          height={height}
        />
      }
    </PlaceholderWrapper>
  )
}

const Placeholder = React.forwardRef((props, ref) => (
  <PlaceholderNoRef ref={ref} {...props} />
))

export default ({
  src,
  height,
  width,
  lqip,
  ...props,
}) => {
  const [visible, setVisible] = useState(false)
  return (
    <Waypoint
      onEnter={() => {!visible && setVisible(true)}}
    >
      <Placeholder
        height={height}
        width={width}
        getSrc={width => visible && src+`?width=${width*(window && window.devicePixelRatio || 1)}`}
        lqip={lqip}
        {...props}
      />
      </Waypoint>
  )
}
