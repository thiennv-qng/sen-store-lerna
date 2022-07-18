import { ReactNode, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { Swiper } from 'swiper/react'
import { Navigation, SwiperOptions } from 'swiper'

import { AppState } from 'model'

import 'swiper/css/bundle'
import './index.os.less'

export const SwiperOs = ({
  children,
  ...rest
}: { children: ReactNode } & SwiperOptions) => {
  const infix = useSelector((state: AppState) => state.ui.infix)
  const isMobile = useMemo(() => infix === 'xs', [infix])

  return (
    <Swiper
      slidesPerView={'auto'}
      lazy
      spaceBetween={24}
      modules={isMobile ? [] : [Navigation]}
      navigation={!isMobile}
      {...rest}
    >
      {children}
    </Swiper>
  )
}
