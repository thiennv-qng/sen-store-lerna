import { MouseEvent, useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'
import { useWallet } from '@sentre/senhub'

import { Button, Card, Col, Row, Space, Typography } from 'antd'
import AppIcon from 'components/appIcon'
import Verification from 'components/verification'

import { useGoToApp } from 'hooks/useGotoApp'
import { useInstallApp } from 'hooks/useInstallApp'
import { AppState } from 'model'

export type AppCardInfoProps = { appId: string }

const AppCardInfo = ({ appId }: AppCardInfoProps) => {
  const register = useSelector((state: AppState) => state.page.register)
  const appIds = useSelector((state: AppState) => state.page.appIds)
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const onInstallApp = useInstallApp(appId)
  const onGoToApp = useGoToApp({ appId })

  const { name, verified, author } = useMemo(
    () => register[appId] || ({} as ComponentManifest),
    [register, appId],
  )
  const installed = useMemo(() => appIds.includes(appId), [appIds, appId])

  const onInstall = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      if (!account.isAddress(walletAddress))
        throw new Error('Please connect the wallet!')
      return onInstallApp()
    },
    [onInstallApp, walletAddress],
  )

  const onOpen = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      return onGoToApp()
    },
    [onGoToApp],
  )

  return (
    <Card
      bordered={false}
      className="glass"
      style={{
        // Don't remove the border-radius bottom because -webkit- properties not working with overflow hidden.
        borderTopRightRadius: 'unset',
        borderTopLeftRadius: 'unset',
        boxShadow: 'unset',
      }}
      bodyStyle={{
        padding: '12px 16px',
      }}
    >
      <Row align="middle" gutter={[8, 8]} wrap={false}>
        <Col>
          <AppIcon size={32} appId={appId} name={false} />
        </Col>
        <Col flex="auto">
          <Space direction="vertical" size={0}>
            <Space align="center" style={{ lineHeight: 1 }}>
              <Typography.Title level={5}>{name}</Typography.Title>
              <Verification verified={verified} />
            </Space>
            <Typography.Text type="secondary">{author?.name}</Typography.Text>
          </Space>
        </Col>
        <Col>
          {installed ? (
            <Button ghost size="small" onClick={onOpen} id="open-action-button">
              Open
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={onInstall}
              size="small"
              id="install-action-button"
            >
              Install
            </Button>
          )}
        </Col>
      </Row>
    </Card>
  )
}

export default AppCardInfo
