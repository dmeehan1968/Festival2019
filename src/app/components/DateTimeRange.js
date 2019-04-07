import React from 'react'
import DateTime from 'app/components/DateTime'

export default ({ start, end, format }) => {
  return (
    <span className="datetimerange">
      <DateTime date={start} format={format} />
      &nbsp;-&nbsp;
      <DateTime date={end} format={format} />
    </span>
  )
}
