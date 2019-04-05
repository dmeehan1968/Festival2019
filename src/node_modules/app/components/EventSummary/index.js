import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import path from 'path'
import { Link } from 'react-router-dom'

import styles from './EventSummary.less'
import placeholderImage from 'static/Placeholder.png'

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
  const [ isClient, setIsClient ] = useState(false)
  useEffect(() => {setIsClient(true)})

  image = image || {
      filename: placeholderImage,
      title: 'No Image Found',
    }

  return (
    <article className={className}>
      {image && <Link to={`/events/${id}`}><img src={image.filename} alt={image.title}></img></Link>}
      <div className={styles.meta}>
        {title && <h2><Link to={`/events/${id}`}>{title}</Link></h2>}
        {subtitle && <h3>{subtitle}</h3>}
        {isClient && (
          <div className={classNameFavourite}>
            <label className={isFavourite ? styles.checked : styles.unchecked}>
              <input
                type="checkbox"
                onChange={e => setFavourite(id, e.target.checked)}
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
