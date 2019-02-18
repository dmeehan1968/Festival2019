import React from 'react'

const Event = ({ title, shortdesc }) => {
  return (
    <section>
      <h1>{title}</h1>
      <p>{shortdesc}</p>
    </section>
  )
}

export default Event
