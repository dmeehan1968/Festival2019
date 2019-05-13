import React from 'react'
import stringifyClassnames from 'app/helpers/stringifyClassnames'
import { Term, Definition } from './styles'

export const Meta = ({ title, content, className }) => {
  const cssClassNameFromString = s => {
    return s
      .toLowerCase()
      .replace(/[^a-z0-9]/g,'-')  // non-word to hyphen
      .replace(/--/g,'-') // remove duplicate hyphens
      .replace(/^-+/g,'') // remove leading hyphens
      .replace(/-+$/g,'') // remove trailing hyphens
    }

  if (!content) return null

  const classNames = stringifyClassnames([className, cssClassNameFromString(title)])

  return (
    <>
      <Term className={classNames}>{title}</Term>
      <Definition className={classNames}>{content}</Definition>
    </>
  )
}

export default Meta
