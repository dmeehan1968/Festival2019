import React from 'react'

const Event = ({ title, subtitle, shortdesc, preferred_image }) => {
  return (
    <article className="event">
      {preferred_image && preferred_image.filename ? <section className="image">
        <img src={preferred_image.filename} alt={preferred_image.title} />
      </section> : null}
      <section className="meta">
        <h1 className="title">
          <a href="#">{title}</a>
        </h1>
        {subtitle ? <h1 className="subtitle">{subtitle}</h1> : null}
        <p className="shortdesc">{shortdesc}</p>
      </section>
    </article>
  )
}

export default Event
