'use client'

import React, { useEffect, useState } from 'react'
import { Typography, Card, Col, Row, Avatar, Spin } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function SearchResultsPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      enqueueSnackbar('You must be logged in to view search results', {
        variant: 'error',
      })
      router.push('/search')
      return
    }

    const fetchSearchResults = async () => {
      try {
        const searchQueries = await Api.SearchQuery.findManyByUserId(userId, {
          includes: ['searchResults', 'searchResults.component'],
        })
        const results = searchQueries.flatMap(
          sq =>
            sq.searchResults?.map(sr => ({
              ...sr.component,
              dateCreated: sr.dateCreated,
            })) || [],
        )
        setSearchResults(results)
      } catch (error) {
        enqueueSnackbar('Failed to fetch search results', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    fetchSearchResults()
  }, [userId, router])

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <Title level={2}>Search Results</Title>
        <Text>Results for your latest electronic components search.</Text>
        {loading ? (
          <Spin size="large" />
        ) : (
          <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
            {searchResults.map(result => (
              <Col xs={24} sm={12} md={8} lg={6} key={result.id}>
                <Card
                  hoverable
                  onClick={() => router.push(`/component/${result.id}`)}
                  cover={
                    <Avatar
                      size={64}
                      icon={<SearchOutlined />}
                      src={result.pictureUrl}
                    />
                  }
                >
                  <Card.Meta
                    title={result.name}
                    description={dayjs(result.dateCreated).format('DD/MM/YYYY')}
                  />
                  <Text type="secondary">{result.description}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </PageLayout>
  )
}
