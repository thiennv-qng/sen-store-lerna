import { useCallback, useEffect, useState } from 'react'
import { util } from '@sentre/senhub'

import { parseColor } from './parseColor'

const PriceChange = ({
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
      {util.numeric(Math.abs(cgkData?.priceChange)).format('0.[0]')}%
    </span>
  )
}

export default PriceChange
