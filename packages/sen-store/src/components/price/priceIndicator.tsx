import { useCallback, useEffect, useState } from 'react'
import { util } from '@sentre/senhub'

import IonIcon from '@sentre/antd-ionicon'

import { parseColor } from './parseColor'

const PriceIndicator = ({
  ticket,
  colorized = false,
  className,
}: {
  ticket: string
  colorized?: boolean
  className?: string
}) => {
  const [cgkData, setCGKData] = useState<CgkData>()

  const getCGKData = useCallback(async () => {
    const cgkData = await util.fetchCGK(ticket)
    return setCGKData(cgkData)
  }, [ticket])

  useEffect(() => {
    getCGKData()
  }, [getCGKData])

  let name = 'remove-outline'
  if (cgkData?.priceChange < 0) name = 'arrow-down-outline'
  if (cgkData?.priceChange > 0) name = 'arrow-up-outline'
  const color = parseColor(cgkData?.priceChange)
  return (
    <span
      style={{ color: colorized ? color : 'inherit' }}
      className={className}
    >
      <IonIcon name={name} />
    </span>
  )
}

export default PriceIndicator
