'use client'

import React, { useEffect, useState } from 'react'
import { Typography, Descriptions, Spin, Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ComponentDetailsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [component, setComponent] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!params.id) {
      enqueueSnackbar('Component ID is missing', { variant: 'error' })
      router.push('/search')
      return
    }

    const fetchComponentDetails = async () => {
      try {
        const componentDetails = await Api.Component.findOne(params.id, {
          includes: ['componentViews'],
        })
        setComponent(componentDetails)
        setIsLoading(false)

        // Log view
        if (userId) {
          await Api.ComponentView.createOneByUserId(userId, {
            componentId: params.id,
          })
        }
      } catch (error) {
        enqueueSnackbar('Failed to fetch component details', {
          variant: 'error',
        })
        router.push('/search')
      }
    }

    fetchComponentDetails()
  }, [params.id, userId, router])

  return (
    <PageLayout layout="full-width">
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        onClick={() => router.push('/search')}
      >
        Back to search
      </Button>
      {isLoading ? (
        <Spin size="large" />
      ) : (
        component && (
          <>
            <Title level={2}>{component.name}</Title>
            <Text type="secondary">
              {dayjs(component.dateCreated).format('DD MMM YYYY')}
            </Text>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="ID">{component.id}</Descriptions.Item>
              <Descriptions.Item label="Description">
                {component.description || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Type">
                {component.type || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Detailed Info">
                {component.detailedInfo ? (
                  <Text>{component.detailedInfo}</Text>
                ) : (
                  <a
                    href={component.detailedInfoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    More Details
                  </a>
                )}
              </Descriptions.Item>
            </Descriptions>
          </>
        )
      )}
    </PageLayout>
  )
}
