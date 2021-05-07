/** One thousand */
const K = 1000
/** One mililon */
const M = K ** 2
/** One billion */
const B = K ** 3
/** One trillion */
const T = K ** 4
/** One trillion */

/**
 * Format currency, add suffix of number longer than length options
 * @function
 * @param {number} value - value to be formatted
 * @param {formatOptions} options - options fo format
 * @return {string} css template from styled API
 */
export const formatCurrency = (value, options = {}) => {
  const { suffix: overwriteSuffix, len, decimals = 2, prefix = 'IDR ', ignoreZeroDecimal } = options
  if (typeof value !== 'number') return prefix
  let suffix = ''
  let val = Math.abs(value)
  if (len) {
    const base = 10 ** (len - 1)
    if (val >= base * T) {
      val /= T
      suffix = 'T'
    } else if (val >= base * B) {
      val /= B
      suffix = 'B'
    } else if (val >= base * M) {
      val /= M
      suffix = 'M'
    } else if (val >= base * K) {
      val /= K
      suffix = 'K'
    }
  }
  const text = `${prefix}${val.toLocaleString('id-ID', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: ignoreZeroDecimal ? 0 : decimals,
  })}`
  return value < 0 ? `-${text} ${overwriteSuffix || suffix}` : `${text} ${overwriteSuffix || suffix}`
}