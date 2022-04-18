const numberFormat = (
  number: number,
  { decimals = 0, thousandSeparator = '.', decimalSeparator = ',' } = {}
) => {
  return number
    ?.toFixed?.(decimals)
    ?.replace?.('.', decimalSeparator)
    ?.replace?.(/(\d)(?=(\d{3})+(?!\d))/g, `$1${thousandSeparator}`)
}

export default numberFormat
