import React from 'react'
import moment from 'moment'
import DateTime from 'app/components/DateTime'
import DateTimeRange from 'app/components/DateTimeRange'

export default ({ dates, times }) => {
  dates = dates.map(date => ({ ...date, date: moment(date.date) }))
  times = times.map(time => ({ ...time, start: moment(time.start), end: moment(time.end) }))
  return (
    <table>
      <thead>
        <tr>
          {dates.map((d, i) => <td key={i}><DateTime date={d.date} format="ddd Do" /></td>)}
        </tr>
      </thead>
      <tbody>
        <tr>
          {dates.map((d, i) => (
            <td key={i}>
              {(() => {
                const output = times.filter(t => t.start.isSame(d.date, 'day')).map((t, i) => <DateTimeRange key={i} start={t.start} end={t.end} format="HH:mm" />)
                return output.length ? output : "Closed"
              })()}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}
