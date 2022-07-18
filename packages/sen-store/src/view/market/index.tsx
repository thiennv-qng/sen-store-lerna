import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useWallet } from '@sentre/senhub'

import { Row, Col } from 'antd'
import TopBanner from './topBanner'
import BottomBanner from './bottomBanner'
import AppCategorySeeAll from './appCategory/seeAll'
import AppCategorySlice from './appCategory/slice'
import AllApps from './allApps'

import { compareAliasString } from './appCategory/hooks/custom'
import { AppDispatch, AppState } from 'model'
import { useDispatch, useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'
import { loadPage, loadRegister } from 'model/page.controller'

const CATEGORIES = ['utility', 'DAO', 'liquidity', 'sentre', 'game']

const Market = () => {
  const { search } = useLocation()
  const register = useSelector((state: AppState) => state.page.register)
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const dispatch = useDispatch<AppDispatch>()

  const category = useMemo(
    () => new URLSearchParams(search).get('category'),
    [search],
  )

  const tags = useMemo(() => {
    let tags: string[] = []
    for (const appId in register) {
      const newTags = register[appId]?.tags || []
      // Remove duplicate elements
      tags = Array.from(new Set([...tags, ...newTags]))
    }
    return CATEGORIES.filter((category) => compareAliasString(category, tags))
  }, [register])

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

  if (category) return <AppCategorySeeAll category={category} />
  return (
    <Row gutter={[16, 48]} justify="center">
      <Col span={24} className="sentre-col-container">
        <Row gutter={[16, 48]}>
          <Col span={24}>
            <TopBanner />
          </Col>
          {tags.map((tag) => (
            <Col span={24} key={tag}>
              <AppCategorySlice category={tag} />
            </Col>
          ))}
          <Col span={24}>
            <AllApps />
          </Col>
          <Col span={24}>
            <BottomBanner />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Market
