import { useCallback, useEffect, useState } from 'react'

import { util } from '@sentre/senhub'
import { parseColor } from './parseColor'

const Price = ({
  ticket,
  colorized = false,
}: {
  ticket: string
  colorized?: boolean
}) => {
  const [cgkData, setCGKData] = useState<CgkData>()

  const getCGKData = useCallback(async () => {
    const cgkData = await util.fetchCGK(ticket)
    return setCGKData(cgkData)
  }, [ticket])

  useEffect(() => {
    getCGKData()
  }, [getCGKData])

  const color = parseColor(cgkData?.priceChange)
  return (
    <span style={{ color: colorized ? color : 'inherit' }}>
      ${util.numeric(cgkData?.price).format('0,0.[00]')}
    </span>
  )
}

export default Price
export { default as PriceChange } from './priceChange'
export { default as PriceIndicator } from './priceIndicator'
export { default as PriceSolidus } from './priceSolidus'
