// Pagin.js
import React, { useState, useEffect } from 'react'
import { Pagination } from 'antd'

const Pagin = ({ nextPage, pages }) => {
  const [current, setCurrent] = useState(() => {
    const savedPage = localStorage.getItem('currentPage')
    return savedPage ? parseInt(savedPage, 10) : 1
  })

  useEffect(() => {
    localStorage.setItem('currentPage', current.toString())
  }, [current])

  const onChange = (page) => {
    setCurrent(page)
    nextPage(page)
  }

  return <Pagination current={current} onChange={onChange} total={pages * 10} showSizeChanger={false} />
}

export default Pagin
