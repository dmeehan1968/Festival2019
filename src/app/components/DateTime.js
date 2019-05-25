import React from 'react'

export default ({ date, format }) => {
  return (
    <span className="datetime">{date.setZone('Europe/London').toFormat(format)}</span>
  )
}
