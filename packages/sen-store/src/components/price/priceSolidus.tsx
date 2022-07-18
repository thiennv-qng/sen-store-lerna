import { useCallback, useEffect, useState } from 'react'
import { util } from '@sentre/senhub'

import { parseColor } from './parseColor'

const PriceSolidus = ({
  ticket,
  colorized = false,
  symbol = '/',
}: {
  ticket: string
  colorized?: boolean
  symbol?: string
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
  return <span style={{ color: colorized ? color : 'inherit' }}>{symbol}</span>
}

export default PriceSolidus
