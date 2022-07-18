import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import {
  setVisibleActionCenter,
  setVisibleInstaller,
} from 'model/ui.controller'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from 'model'

export type GoToAppProps = {
  appId?: string
  blank?: boolean
  search?: string
}

export const useGoToAppCallback = () => {
  const history = useHistory()
  const dispatch = useDispatch<AppDispatch>()
  const visibleActionCenter = useSelector(
    (state: AppState) => state.ui.visibleActionCenter,
  )
  const visibleInstaller = useSelector(
    (state: AppState) => state.ui.visibleInstaller,
  )

  const onGotoAppCallback = useCallback(
    async ({ appId, blank = false, search }: GoToAppProps = {}) => {
      if (visibleActionCenter) await dispatch(setVisibleActionCenter(false))
      if (visibleInstaller) await dispatch(setVisibleInstaller(false))
      const nav = blank
        ? (url: string) => window.open(url, '_blank')
        : history.push
      let url = appId ? `/app/${appId}` : '/app'
      url = search ? url + search : url
      return nav(url)
    },
    [dispatch, history, visibleActionCenter, visibleInstaller],
  )

  return onGotoAppCallback
}

export const useGoToApp = ({
  appId,
  blank = false,
  search,
}: GoToAppProps = {}) => {
  const onGotoAppCallback = useGoToAppCallback()
  const onGotoApp = useCallback(async () => {
    return onGotoAppCallback({ appId, blank, search })
  }, [onGotoAppCallback, appId, blank, search])

  return onGotoApp
}