'use client'

import React, { useState } from 'react'
import { Input, Button, Typography, Card, Row, Col, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function SearchComponentsPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!searchText) {
      enqueueSnackbar('Please enter a search query.', { variant: 'info' })
      return
    }

    setLoading(true)
    try {
      const response = await Api.Ai.chat(searchText)
      const searchQuerysFound = await Api.SearchQuery.findMany({
        filters: { queryText: { like: searchText } },
        includes: ['user', 'searchResults', 'searchResults.component'],
      })
      setSearchResults(searchQuerysFound.map(sq => sq.searchResults).flat())
      enqueueSnackbar(`Search completed: ${response}`, { variant: 'success' })
    } catch (error) {
      console.error(error)
      enqueueSnackbar('Failed to perform search.', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageLayout layout="full-width">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Search for Electronic Components</Title>
        <Text>
          Enter your query in natural language to search for electronic
          components.
        </Text>
        <Input.Search
          placeholder="Enter search query"
          enterButton={
            <Button type="primary" icon={<SearchOutlined />}>
              Search
            </Button>
          }
          size="large"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          onSearch={handleSearch}
          loading={loading}
        />
        <Row gutter={[16, 16]}>
          {searchResults?.map((result, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6} xl={4}>
              <Card
                title={result.component?.name}
                onClick={() => router.push(`/component/${result.componentId}`)}
                hoverable
              >
                <Text>{result.component?.description}</Text>
                <br />
                <Text type="secondary">
                  Updated: {dayjs(result.dateUpdated).format('DD/MM/YYYY')}
                </Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Space>
    </PageLayout>
  )
}
