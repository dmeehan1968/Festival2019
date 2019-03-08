export default (...args) => {

  const reducer = (accumulator, arg) => {
    // recurse into arrays
    if (Array.isArray(arg)) {
      return arg.reduce(reducer, accumulator)
    }

    // split strings on spaces
    if (typeof arg === 'string') {
      const regexClassnames = /[\w\-_]+/g
      return [ ...accumulator, ...(arg.match(regexClassnames)) ]
    }

    // skip undefined and null
    if (typeof arg === 'undefined' || arg === null) {
      return accumulator
    }

    throw new TypeError(`${typeof arg} "${arg}" is not a valid classname`)
  }

  const classnames = args.reduce(reducer, [])

  return [...new Set(classnames.filter(s=>!!s))].join(' ')

}
