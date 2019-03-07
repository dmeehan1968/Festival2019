import React from 'react'
import stringifyClassnames from 'app/helpers/stringifyClassnames'

export default ({ title, content, className }) => {
  const cssClassNameFromString = s => {
    return s
      .toLowerCase()
      .replace(/[^a-z0-9]/g,'-')  // non-word to hyphen
      .replace(/--/g,'-') // remove duplicate hyphens
      .replace(/^-+/g,'') // remove leading hyphens
      .replace(/-+$/g,'') // remove trailing hyphens
    }

  if (!content) return null

  const classNames = stringifyClassnames(['meta', className, cssClassNameFromString(title)])

  return (
    <>
      <dt className={classNames}>{title}</dt>
      <dd className={classNames}>{content}</dd>
    </>
  )
}
