import React, { useState, useRef, useReducer } from 'react'
import ReactDOMServer from 'react-dom/server'
import { Waypoint } from 'react-waypoint'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  overflow: hidden;
`
Container.displayName = 'Container'

const PreserveAspectRatio = styled.div`
  width: 100%;
  padding-bottom: ${p=>Math.floor(100 / p.aspectRatio)}%;
`
PreserveAspectRatio.displayName = 'PreserveAspectRatio'

const Img = styled.img`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: auto;
  width: 100%;
  max-width: 100%;
  object-fit: cover;
  object-position: 50% 50%;
`

const BackgroundColor = styled.div`
  background-color: ${p=>p.theme.colorGray2};
  ${'' /* background-color: red; */}
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`
BackgroundColor.displayName = 'BackgroundColor'

const NoScript = ({
  children,
}) => {
  return (
    <noscript
      dangerouslySetInnerHTML={{
        __html: ReactDOMServer.renderToStaticMarkup(children)
      }}
    />
  )
}

// 1x1 transparent PNG
// data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=

const Image = ({
  src,
  lqip,
  height,
  width,
  alt,
}) => {

  const devicePixelRatio = typeof window !== 'undefined' && window && window.devicePixelRatio || 1
  const image = {
    src, height, width, alt,
  }
  const isReducer = (state, { type }) => {
    switch (type) {
      case 'loading':
        return {
          ...state,
          unloaded: false,
          loading: true,
        }
      case 'lqipLoaded':
        return {
          ...state,
          lqipLoaded: true,
          loading: state.imgLoaded ? false : true,
        }
      case 'imgLoaded':
        return {
          ...state,
          imgLoaded: true,
          loading: state.lqipLoaded ? false : true,
        }
      default:
        throw new Error()
    }
  }
  const [ is, dispatch ] = useReducer(isReducer, { unloaded: true })

  const [sizeRef, rect] = useBoundingClientRect()

  return (
    <Container ref={sizeRef}>
      <Waypoint onEnter={()=>is.unloaded && dispatch({type: 'loading'})}>
        <PreserveAspectRatio aspectRatio={width / height} />
      </Waypoint>
      <BackgroundColor />
      {rect && lqip &&
        <Img
          {...image}
          src={lqip(Math.round(rect.width*devicePixelRatio))}
          onLoad={()=>!is.lqipLoaded && dispatch({type: 'lqipLoaded'})}
          style={{
            opacity: is.lqipLoaded ? 1 : 0,
            transition: 'opacity 0.5s',
          }}
        />
      }
      {rect && src && !is.unloaded &&
        <Img
          {...image}
          src={src(Math.round(rect.width*devicePixelRatio))}
          onLoad={()=>!is.imgLoaded && dispatch({type: 'imgLoaded'})}
          style={{
            opacity: is.imgLoaded ? 1 : 0,
            transition: 'opacity 0.5s',
            transitionDelay: '2s',
          }}
        />
      }
      <NoScript>
        <div
          style={{
              width: '100%',
              paddingBottom: `${Math.floor(100 / (width / height))}%`,
          }}
        />
        <img
          {...image}
          src={src()}
          style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              height: 'auto',
              width: '100%',
              maxWidth: '100%',
              objectFit: 'cover',
              objectPosition: '50% 50%',
          }}
        />
      </NoScript>
    </Container>
  )
}
Image.displayName = 'Image'

export default Image

export const createSrcSet = (maxWidth, breakpoints = [ 320, 530, 950, 1130 ], densities = [ 1, 2, 3 ]) => {
  return [...breakpoints.filter(bp=>bp <= maxWidth).reduce((acc, bp) => {
    densities.forEach(d => acc.add(d * bp))
    return acc
  }, new Set([maxWidth]))]
  .sort((a,b)=>a-b)
}

const useBoundingClientRect = () => {
  const sizeRef = useRef(null)
  const rect = sizeRef.current && sizeRef.current.getBoundingClientRect() || null
  return [ sizeRef, rect ]
}
