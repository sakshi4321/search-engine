'use client'

import { useEffect, useState } from 'react'
import { Typography, Card, Row, Col, Space } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ViewedComponentsPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const [componentViews, setComponentViews] = useState([])

  useEffect(() => {
    if (userId) {
      Api.ComponentView.findManyByUserId(userId, { includes: ['component'] })
        .then(setComponentViews)
        .catch(() =>
          enqueueSnackbar('Failed to fetch viewed components', {
            variant: 'error',
          }),
        )
    }
  }, [userId])

  return (
    <PageLayout layout="full-width">
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Title level={2}>Viewed Components</Title>
        <Text>Here are the components you've viewed.</Text>
        <Row gutter={[16, 16]} justify="center">
          {componentViews?.map(view => (
            <Col key={view.id} xs={24} sm={12} md={8} lg={6} xl={4}>
              <Card
                hoverable
                title={view.component?.name}
                extra={
                  <EyeOutlined
                    onClick={() =>
                      router.push(`/component/${view.componentId}`)
                    }
                  />
                }
              >
                <Text>{view.component?.description}</Text>
                <br />
                <Text type="secondary">
                  Viewed on {dayjs(view.dateCreated).format('DD MMM YYYY')}
                </Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Space>
    </PageLayout>
  )
}
