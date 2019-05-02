import { useState, useEffect } from 'react'

export default () => {
  const [ isClient, setIsClient ] = useState(false)
  useEffect(() => { setIsClient(true) })
  return isClient
}
