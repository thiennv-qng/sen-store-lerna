import { useEffect } from 'react'
import { RootDispatch, useRootDispatch, useWallet } from '@sentre/senhub'
import { account } from '@senswap/sen-js'
import { Redirect, Route, Switch } from 'react-router-dom'

import { Layout } from 'antd'

import Market from './market'
import AppInfos from 'view/appInfos'

import { loadPage, loadRegister } from '@sentre/senhub/dist/store/page.reducer'
import configs from 'configs'

import 'static/styles/dark.less'
import 'static/styles/light.less'

const {
  manifest: { appId },
} = configs

const View = () => {
  const dispatch = useRootDispatch<RootDispatch>()
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  // Load DApp flags, registry, page
  useEffect(() => {
    ;(async () => {
      if (!account.isAddress(walletAddress)) return dispatch(loadRegister())
      try {
        const register = await dispatch(loadRegister()).unwrap()
        if (Object.keys(register).length) await dispatch(loadPage())
      } catch (er: any) {
        return window.notify({ type: 'warning', description: er.message })
      }
    })()
  }, [dispatch, walletAddress])

  return (
    <Layout>
      <Layout.Content>
        <Switch>
          <Route exact path={`/app/${appId}/`} component={Market} />
          <Route exact path={`/app/${appId}/:appId`} component={AppInfos} />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Layout.Content>
    </Layout>
  )
}

export default View
