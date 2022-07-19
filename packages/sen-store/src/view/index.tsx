import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useWallet } from '@sentre/senhub'
import { account } from '@senswap/sen-js'
import { Redirect, Route, Switch } from 'react-router-dom'

import { Layout } from 'antd'

import Market from './market'
import AppViewer from 'view/market/appViewer'

import configs from 'configs'
import { AppDispatch } from 'model'
import { loadPage, loadRegister } from 'model/page.controller'

import 'static/styles/dark.less'
import 'static/styles/light.less'

const {
  manifest: { appId },
} = configs

const View = () => {
  const dispatch = useDispatch<AppDispatch>()
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
          <Route exact path={`/app/${appId}/:appId`} component={AppViewer} />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Layout.Content>
    </Layout>
  )
}

export default View
