import { useEffect } from 'react'
import ReactGA from 'react-ga'
import useOnce from 'app/helpers/useOnce'

export const GoogleAnalytics = ({
  location,
}) => {
  if (process.env.GOOGLE_ANALYTICS) {
    useOnce(() => {
      ReactGA.initialize(process.env.GOOGLE_ANALYTICS)
    })

    useEffect(() => {
      ReactGA.pageview(location.pathname)
    }, [location.pathname])
  }
  return null
}

export default GoogleAnalytics
