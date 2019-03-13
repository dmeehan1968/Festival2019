import React from 'react'
import stringifyClassnames from 'app/helpers/stringifyClassnames'
import styles from './CheckboxGroup.less'
import crypto from 'crypto'

export default ({
  className,
  title,
  options = [],
  idKey = "id",
  labelKey = "description",
  labelFormat = label => label,
  selected = [],
  onChange = () => {},
  onSelectAll = () => {},
  onSelectNone = () => {},
}) => {
  const currentDate = (new Date()).valueOf().toString()
  const random = Math.random().toString()
  const hash = crypto.createHash('sha1').update(currentDate+random).digest('hex').slice(-8)

  return (
    <fieldset className={stringifyClassnames(styles.options, className)}>
      <legend>{title}</legend>
      <div>Select: <a href="#" onClick={onSelectAll}>All</a> / <a href="#" onClick={onSelectNone}>None</a></div>
      {options.map(option => {
        const ident = hash + '_' + option[idKey]
        return (
          <React.Fragment key={option[idKey]}>
            <input
              id={ident}
              type="checkbox"
              checked={selected.indexOf(option[idKey]) !== -1}
              onChange={e => onChange(option[idKey], e.target.checked)} />
            <label htmlFor={ident} key={option[idKey]}>{labelFormat(option[labelKey])}</label>
          </React.Fragment>
        )
      })}
    </fieldset>
  )
}
