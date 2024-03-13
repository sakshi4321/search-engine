'use client'

import { useEffect, useState } from 'react'
import { Typography, List, Avatar, Space } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function SearchHistoryPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const [searchHistory, setSearchHistory] = useState([])

  useEffect(() => {
    if (userId) {
      Api.User.findOne(userId, { includes: ['searchQuerys'] })
        .then(user => {
          if (user && user.searchQuerys) {
            setSearchHistory(user.searchQuerys)
          }
        })
        .catch(error => {
          enqueueSnackbar('Failed to fetch search history', {
            variant: 'error',
          })
          console.error(error)
        })
    }
  }, [userId])

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <Title level={2}>Search History</Title>
        <Text>Here you can find all the search queries you have made.</Text>
        <List
          itemLayout="horizontal"
          dataSource={searchHistory}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon={<ClockCircleOutlined />} />}
                title={
                  <a
                    onClick={() =>
                      router.push(`/search?query=${item.queryText}`)
                    }
                  >
                    {item.queryText}
                  </a>
                }
                description={`Searched on ${dayjs(item.dateCreated).format('DD/MM/YYYY')}`}
              />
            </List.Item>
          )}
        />
      </div>
    </PageLayout>
  )
}
