import { Layout } from 'antd'
import { Redirect, Route, Switch } from 'react-router-dom'
import Market from './market'
import PopularTwitter from './popularTwitter'
import Trending from './trending'

import configs from 'configs'

const {
  manifest: { appId },
} = configs

const View = () => {
  return (
    <Layout>
      <Layout.Content>
        <Switch>
          <Route exact path={`/app/${appId}/`} component={Market} />
          <Route exact path={`/app/${appId}/details`} component={Trending} />
          <Route
            exact
            path={`/app/${appId}/details/:id`}
            component={PopularTwitter}
          />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Layout.Content>
    </Layout>
  )
}

export default View
