import React from 'react'
import DateTime from 'app/components/DateTime'
import { timeStringFromDate } from 'app/helpers/dateTime'

export default ({ start, end, formatter }) => {
  return (
    <span className="datetimerange">
      <DateTime date={start} formatter={formatter} />
      &nbsp;-&nbsp;
      <DateTime date={end} formatter={formatter} />
    </span>
  )
}
