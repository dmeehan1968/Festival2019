import React from 'react'
import DateTime from 'app/components/DateTime'
import DateTimeRange from 'app/components/DateTimeRange'

import { Table } from './styles'

export const OpeningTimes = ({ dates, times }) => {

  if (!times || times.length < 1) {
    return 'No Opening Times Specified'
  }

  return (
    <Table>
      <thead>
        <tr>
          <td>Date</td>
          <td>Opening Times</td>
        </tr>
      </thead>
      <tbody>
        {dates.map((d, i) => (
          <tr key={i}>
            <td><DateTime date={d.date} format="EEE d" /></td>
            <td>
              {(() => {
                const output = times.filter(t => t.start.hasSame(d.date, 'day')).map((t, i) => <DateTimeRange key={i} start={t.start} end={t.end} format="HH:mm" />)
                return output.length ? output : "Closed"
              })()}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default OpeningTimes
