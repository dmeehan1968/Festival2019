import React from 'react'

export default ({ date, formatter }) => {
  return (
    <span className="datetime">{formatter(date)}</span>
  )
}
