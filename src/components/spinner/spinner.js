import React from 'react'
import { Alert, Space, Spin } from 'antd'

const Spinner = () => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Spin tip="Loading...">
      <Alert
        message="Страница загружается"
        description="Further details about the context of this alert."
        type="info"
      />
    </Spin>
  </Space>
)
export default Spinner
