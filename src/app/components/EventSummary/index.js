import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import path from 'path'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import useIsClient from 'app/helpers/useIsClient'
import placeholderImage from 'static/Placeholder.png'
import ReactGA from 'react-ga'

import Image from 'app/components/Image'

const EventSummary = ({
  id,
  title,
  subtitle,
  preferred_image: image,
  isFavourite = false,
  setFavourite = (id, checked) => { console.log(id, checked) },
  className,
}) => {
  const isClient = useIsClient()

  image = image || {
      filename: placeholderImage,
      title: 'No Image Found',
      height: 500,
      width: 500,
    }

  const Label = isFavourite ? Checked : Unchecked

  return (
    <article className={className}>
      <Link to={`/events/${id}`}>
        <Image
          src={width=>`${image.filename}?width=${width}`}
          lqip={width=>`${image.filename}?width=${width}&quality=5`}
          alt={image.title}
          height={image.height}
          width={image.width}
        />
      </Link>
      <Meta>
        {title && <h2><Link to={`/events/${id}`}>{title}</Link></h2>}
        {subtitle && <h3>{subtitle}</h3>}
        {isClient && (
          <Favourite>
            <Label>
              <input
                type="checkbox"
                onChange={e => {
                  if (process.env.GOOGLE_ANALYTICS) {
                    ReactGA.event({
                      category: 'EventSummary',
                      action: `${e.target.checked ? 'Set' : 'Clear'} Favourite`,
                      label: title,
                      value: id,
                    })
                  }
                  setFavourite(id, e.target.checked)
                }}
                checked={isFavourite}
              />
              <FontAwesomeIcon icon="heart" />
              <span>Favourite</span>
            </Label>
          </Favourite>
        )}
      </Meta>
    </article>
  )
}

export const Meta = styled.div``
export const Favourite = styled.div``
export const Checked = styled.label``
export const Unchecked = styled.label``

export default styled(EventSummary)`
  min-height: 5em;
  display: inline-block;
  margin-bottom: ${p=>p.theme.spaceXs};
  position: relative;
  background-color: ${p=>p.theme.colorOverlay};
  border: @--line-xs solid ${p=>p.theme.colorGray2};
  z-index: 0;
  break-inside: avoid-column;
  width: 100%;

  ${Meta} {

    display: grid;
    grid-template-areas:  "title fav"
                          "subtitle fav";
    grid-column-gap: ${p=>p.theme.spaceMd};
    align-items: center;
    padding: ${p=>p.theme.spaceXs} ${p=>p.theme.spaceMd};
    background-color: ${p=>p.theme.colorBrandBlue};
    width: 100%;

    h2 {
      grid-area: title;
    }

    h3 {
      grid-area: subtitle;
    }

    h2, h3 {
      font-size: ${p=>p.theme.textSm};
      color: ${p=>p.theme.colorForeground};
      text-shadow: 0px 0px 0.1em ${p=>p.theme.colorBlack};
      margin-bottom: 0;
    }

    h3 {
      font-size: ${p=>p.theme.textXs};
      font-weight: normal;
    }

    ${Favourite} {
      grid-area: fav;
      justify-self: end;
      font-size: ${p=>p.theme.textLg};

      ${Checked}, ${Unchecked} {
        cursor: pointer;
      }

      input[type="checkbox"] {
        display: none;
      }

      ${Checked} {
        color: ${p=>p.theme.colorPrimary};
        &:hover {
          color: ${p=>p.theme.colorPrimaryLight};
        }
      }

      ${Unchecked} {
        color: ${p=>p.theme.colorGray4};
        &:hover {
          color: ${p=>p.theme.colorGray3};
        }
      }

      span {
        display: none;
      }
    }

  }

  a, a:visited {
    color: ${p=>p.theme.colorWhite};
  }
`
