export const utcDateFromSQLDate = dateTimeString => {
  const dateParts = dateTimeString.split(/[: -]/)
  dateParts[1]--
  return new Date(Date.UTC(...dateParts))
}

export const zeroFill = (n, len) => {
  const zeroes = '0000000000'
  return (zeroes+n).slice(-len)
}

export const timeStringFromDate = date => {
  const hour = date.getUTCHours()
  const min = date.getUTCMinutes()
  return `${zeroFill(hour,2)}:${zeroFill(min,2)}`
}

export const dayName = day => {
  const weekdays = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ]
  return weekdays[day]
}

export const monthName = month => {
  const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
  return months[month]
}

export const dayDateStringFromDate = date => {
  const dayOfMonth = date.getUTCDate()
  const dayOfWeek = date.getUTCDay()
  return `${dayName(dayOfWeek)} ${dayOfMonth}`
}

export const longDateStringFromDate = date => {
  const dayOfWeek = date.getUTCDay()
  const dayOfMonth = date.getUTCDate()
  const month = date.getUTCMonth()
  const year = date.getUTCFullYear()
  return `${dayName(dayOfWeek)} ${dayOfMonth} ${monthName(month)} ${zeroFill(year, 4)}`
}

export const sqlDateStringFromDate = date => {
  const dayOfMonth = date.getUTCDate()
  const month = date.getUTCMonth()
  const year = date.getUTCFullYear()
  const hour = date.getUTCHours()
  const min = date.getUTCMinutes()
  const sec = date.getUTCSeconds()
  return `${zeroFill(year,4)}-${zeroFill(month+1,2)}-${zeroFill(dayOfMonth,2)} ${zeroFill(hour,2)}:${zeroFill(min,2)}:${zeroFill(sec,2)}`
}
