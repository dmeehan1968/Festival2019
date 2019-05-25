import React from 'react'
import styled from 'styled-components'

export const Notice = styled.p``
export const PolicyLink = styled((props) => {
  return props.href && <a {...props} />
})``

export const Dismiss = styled(({
  onDismiss,
  ...props,
})=> {
  return onDismiss && <button onClick={onDismiss} {...props} />
})``

export const CookieNotice = ({
  className,
  notice = 'This website uses cookies to enhance the user experience.',
  policy,
  policyText = "Read our privacy policy.",
  onDismiss,
  dismissText = 'Dismiss',
}) => {
  return (
    <div className={className}>
      <Notice>{notice}</Notice>
      <PolicyLink href={policy} target="_blank">{policyText}</PolicyLink>
      <Dismiss onDismiss={onDismiss}>{dismissText}</Dismiss>
    </div>
  )
}

export default CookieNotice
