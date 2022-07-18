import { useCallback } from 'react'
import { account } from '@senswap/sen-js'
import { useDispatch } from 'react-redux'

import { AppDispatch } from 'model'
import { installApp } from 'model/page.controller'
import { useWallet } from '@sentre/senhub'

export const useInstallAppCallback = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  const onInstallCallback = useCallback(
    async (appId: string) => {
      if (!account.isAddress(walletAddress))
        throw new Error('Please connect the wallet!')
      return dispatch(installApp(appId))
    },
    [dispatch, walletAddress],
  )

  return onInstallCallback
}

export const useInstallApp = (appId: string) => {
  const onInstallAppCallback = useInstallAppCallback()
  const onInstallApp = useCallback(async () => {
    return onInstallAppCallback(appId)
  }, [onInstallAppCallback, appId])

  return onInstallApp
}
