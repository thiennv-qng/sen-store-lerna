import { Col, Row } from 'antd'
import BannerHeader from './banner/header'
import BrowseApps from './browseApps'
import HotDApps from './hotDApps'
import Market from './market'
import MostPopular from './mostPopular'
import NewBuilderApps from './newBuilderApps'
import PopularTwitter from './popularTwitter'
import Trending from './trending'

const View = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Market />
      </Col>
      <Col span={24}>
        <BannerHeader />
      </Col>
      <Col span={24}>
        <HotDApps />
      </Col>
      <Col span={24}>
        <MostPopular />
      </Col>
      <Col span={24}>
        <PopularTwitter />
      </Col>
      <Col span={24}>
        <Trending />
      </Col>
      <Col span={24}>
        <BrowseApps />
      </Col>
      <Col span={24}>
        <NewBuilderApps />
      </Col>
    </Row>
  )
}

export default View
