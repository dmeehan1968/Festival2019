export default ([ a, b ], [ c, d ] = [], round = Math.round) => {

  c = (typeof c === 'undefined' ? a : c)
  d = (typeof d === 'undefined' ? b : d)

  if (c === 0 || d === 0) {
    throw new Error('constraints must be non-zero')
  }

  c = Math.min(a, c)
  d = Math.min(b, d)

  const aRatio = (a / c)
  const bRatio = (b / d)
  const ratio = Math.max(aRatio, bRatio)
  const e = round(a / ratio)
  const f = round(b / ratio)

  if (a === e && b === f) {
    return undefined
  }

  return [e, f]
}
