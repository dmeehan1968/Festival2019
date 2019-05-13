import { useState, useEffect } from 'react'

export default () => {
  const [ isClient, setIsClient ] = useState(false)
  useEffect(() => { setIsClient(process.env.NODE_ENV !== 'test' ? true : false) })
  return isClient
}
