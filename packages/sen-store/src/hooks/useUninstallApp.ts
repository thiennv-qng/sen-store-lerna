import { AppDispatch } from 'model'
import { uninstallApp } from 'model/page.controller'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

export const useUninstallAppCallback = () => {
  const history = useHistory()
  const dispatch = useDispatch<AppDispatch>()
  const { pathname } = useLocation()

  const onUninstallCallback = useCallback(
    async (appId: string) => {
      await dispatch(uninstallApp(appId))
      if (!pathname.startsWith(`/app/${appId}`)) return
      return history.push('/welcome')
    },
    [dispatch, pathname, history],
  )

  return onUninstallCallback
}

export const useUninstallApp = (appId: string) => {
  const onUninstallCallback = useUninstallAppCallback()
  const onUninstallApp = useCallback(async () => {
    return onUninstallCallback(appId)
  }, [onUninstallCallback, appId])

  return onUninstallApp
}
