'use client'

import React, { useState } from 'react'
import { Button, Form, Input, Select, Typography, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
const { Title, Paragraph } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function AddNewComponentPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState([])

  const handleUpload = async options => {
    const { file } = options
    const url = await Api.Upload.upload(file)
    setFileList(fileList => [...fileList, { url: url, status: 'done' }])
  }

  const onFinish = async values => {
    try {
      const componentValues = {
        ...values,
        detailedInfoUrl: fileList.length > 0 ? fileList[0].url : undefined,
        dateCreated: dayjs().format(),
        dateUpdated: dayjs().format(),
      }
      await Api.Component.createOne(componentValues)
      enqueueSnackbar('Component added successfully', { variant: 'success' })
      router.push('/search')
    } catch (error) {
      enqueueSnackbar('Failed to add component', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Title level={2}>Add New Electronic Component</Title>
        <Paragraph>
          Fill in the details below to add a new electronic component to the
          database.
        </Paragraph>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Component Name"
            rules={[
              { required: true, message: 'Please input the component name!' },
            ]}
          >
            <Input placeholder="Enter component name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: 'Please input the description!' },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Enter description" />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[
              { required: true, message: 'Please select the component type!' },
            ]}
          >
            <Select placeholder="Select a type">
              <Option value="Resistor">Resistor</Option>
              <Option value="Capacitor">Capacitor</Option>
              <Option value="Inductor">Inductor</Option>
              <Option value="Transistor">Transistor</Option>
            </Select>
          </Form.Item>
          <Form.Item name="detailedInfo" label="Detailed Information">
            <Input.TextArea rows={4} placeholder="Enter detailed information" />
          </Form.Item>
          <Form.Item label="Detailed Information URL">
            <Upload
              fileList={fileList}
              customRequest={handleUpload}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Component
            </Button>
          </Form.Item>
        </Form>
      </div>
    </PageLayout>
  )
}
