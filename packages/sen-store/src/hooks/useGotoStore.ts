import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import {
  setVisibleActionCenter,
  setVisibleInstaller,
} from 'model/ui.controller'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from 'model'

export type GoToStoreProps = {
  appId?: string
  blank?: boolean
  search?: string
}

export const useGoToStoreCallback = () => {
  const history = useHistory()
  const dispatch = useDispatch<AppDispatch>()
  const visibleActionCenter = useSelector(
    (state: AppState) => state.ui.visibleActionCenter,
  )
  const visibleInstaller = useSelector(
    (state: AppState) => state.ui.visibleInstaller,
  )

  const onGotoStoreCallback = useCallback(
    async ({ appId, blank = false, search }: GoToStoreProps = {}) => {
      if (visibleActionCenter) await dispatch(setVisibleActionCenter(false))
      if (visibleInstaller) await dispatch(setVisibleInstaller(false))
      const nav = blank
        ? (url: string) => window.open(url, '_blank')
        : history.push
      let url = appId ? `/app/store/${appId}` : '/app/store'
      url = search ? url + search : url
      return nav(url)
    },
    [dispatch, history, visibleActionCenter, visibleInstaller],
  )

  return onGotoStoreCallback
}

export const useGoToStore = ({
  appId,
  blank = false,
  search,
}: GoToStoreProps = {}) => {
  const onGotoStoreCallback = useGoToStoreCallback()
  const onGotoStore = useCallback(async () => {
    return onGotoStoreCallback({ appId, blank, search })
  }, [onGotoStoreCallback, appId, blank, search])

  return onGotoStore
}
