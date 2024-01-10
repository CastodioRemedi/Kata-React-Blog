import React, { useState } from 'react'
import { Pagination } from 'antd'

const Pagin = ({ nextPage, pages }) => {
  const [current, setCurrent] = useState(1)

  const onChange = (page) => {
    setCurrent(page)
    nextPage(page)
  }

  return <Pagination current={current} onChange={(page) => onChange(page)} total={pages * 10} showSizeChanger={false} />
}

export default Pagin
