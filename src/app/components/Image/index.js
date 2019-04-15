import React, { useState, useRef, useReducer } from 'react'
import Waypoint from 'react-waypoint'
import styled from 'styled-components'

export default ({
  src,
  ...props,
}) => {
  const reducer = (state, { type }) => {
    console.log(type)
    switch (type) {
      case 'loading': return { loading: true, loaded: false }
      case 'loaded': return { loading: false, loaded: true }
      default: throw new Error()
    }
  }
  const [ state, dispatch ] = useReducer(reducer, {})
  const sizeRef = useRef(null)
  let imgWidth
  const devicePixelRatio = typeof window !== 'undefined' && window && window.devicePixelRatio || 1

  if (sizeRef.current) {
    const rect = sizeRef.current.getBoundingClientRect()
    imgWidth = Math.round(rect.width)
  }
  
  return (
    <Waypoint onEnter={()=>(!state.loading && !state.loaded) && dispatch({ 'type': 'loading' })}>
      <div
        style={{
          backgroundColor: 'red',
          width: '100%',
          height: 'auto',
          maxWidth: '100%',
          position: 'relative',
          lineHeight: 0,
        }}
      >
        {!state.loaded &&
          <svg
            ref={sizeRef}
            height={props.height}
            width={props.width}
            style={{
              width: '100%',
              height: 'auto',
              maxWidth: '100%',
            }}
          />
        }
        {(state.loading || state.loaded) &&
          <img
            {...props}
            src={typeof src === 'function' ? src(Math.round(imgWidth*devicePixelRatio)) : src}
            srcSet=""
            sizes=""
            onLoad={e=>(!state.loaded && e.target.complete) && dispatch({type:'loaded'})}
            style={{
              width: '100%',
              height: 'auto',
              maxWidth: '100%',
              opacity: 0,
              transition: 'opacity 2s',
              ...(state.loaded && {
                opacity: 1,
              } || {
                position: 'absolute',
                top: 0,
                left: 0,
              }),
            }}
          />
        }
      </div>
    </Waypoint>
  )
}

export const createSrcSet = (maxWidth, breakpoints = [ 320, 530, 950, 1130 ], densities = [ 1, 2, 3 ]) => {
  return [...breakpoints.filter(bp=>bp <= maxWidth).reduce((acc, bp) => {
    densities.forEach(d => acc.add(d * bp))
    return acc
  }, new Set([maxWidth]))]
  .sort((a,b)=>a-b)
}
