import React from 'react'

export default ({ date, format }) => {
  return (
    <span className="datetime">{date.format(format)}</span>
  )
}
