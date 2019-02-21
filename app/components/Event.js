import React from 'react'

const Event = ({ id, title, subtitle, shortdesc, preferred_image }) => {
  const url = `/events/${id}`
  return (
    <article className="event">
      <section className="meta">
        <h1 className="title">
          <a href={url}>{title}</a>
        </h1>
        {subtitle ? <h1 className="subtitle">{subtitle}</h1> : null}
        <p className="shortdesc">{shortdesc}</p>
      </section>
      {preferred_image && preferred_image.filename ? <section className="image">
        <img src={preferred_image.filename} alt={preferred_image.title} />
      </section> : null}
    </article>
  )
}

export default Event
