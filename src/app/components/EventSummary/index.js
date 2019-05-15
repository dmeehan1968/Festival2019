import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import path from 'path'
import { Link } from 'react-router-dom'

import useIsClient from 'app/helpers/useIsClient'
import styles from './EventSummary.less'
import placeholderImage from 'static/Placeholder.png'
import ReactGA from 'react-ga'

import Image from 'app/components/Image'

export default ({
  id,
  title,
  subtitle,
  preferred_image: image,
  isFavourite = false,
  setFavourite = (id, checked) => { console.log(id, checked) },
  className = styles.container,
  classNameFavourite = styles.favourite,
}) => {
  const isClient = useIsClient()

  image = image || {
      filename: placeholderImage,
      title: 'No Image Found',
      height: 500,
      width: 500,
    }

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
      <div className={styles.meta}>
        {title && <h2><Link to={`/events/${id}`}>{title}</Link></h2>}
        {subtitle && <h3>{subtitle}</h3>}
        {isClient && (
          <div className={classNameFavourite}>
            <label className={isFavourite ? styles.checked : styles.unchecked}>
              <input
                type="checkbox"
                onChange={e => {
                  ReactGA.event({
                    category: 'EventSummary',
                    action: `${e.target.checked ? 'Set' : 'Clear'} Favourite`,
                    label: title,
                    value: id,
                  })
                  setFavourite(id, e.target.checked)
                }}
                checked={isFavourite}
              />
              <FontAwesomeIcon icon="heart" />
              <span>Favourite</span>
            </label>
          </div>
        )}
      </div>
    </article>
  )
}
