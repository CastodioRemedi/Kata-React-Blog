// BlogList.js
import { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { addBlogsStarted, addBlogsSuccsess, addBlogsFailure } from '../../redux/actions'
import BlogService from '../../services/blog-services'
import BlogListItem from '../blogListItem'
import ErrorIndicator from '../error-indicator/error-indicator'
import Spinner from '../spinner/spinner'
import Pagin from '../pagination/pagination'

import classes from './blogList.module.scss'

function BlogList() {
  const [offset, setOffset] = useState(() => {
    const savedOffset = localStorage.getItem('offset')
    return savedOffset ? parseInt(savedOffset) : 0
  })
  const [pages, setPages] = useState(null)
  const { blogs, error, loading } = useSelector((state) => state.blogs)
  const token = useSelector((state) => state.user.token)
  const dispatch = useDispatch()

  const isLoggedIn = token ? true : false
  const { getArticles } = BlogService()

  useEffect(() => {
    updateBlogs()
  }, [offset])

  useEffect(() => {
    localStorage.setItem('offset', offset.toString())
  }, [offset])

  const updateBlogs = async () => {
    dispatch(addBlogsStarted())
    try {
      const res = await getArticles(offset, token)
      onBlogsLoaded(res.articles)
      setPages(Math.ceil(res.articlesCount / 10))
    } catch (e) {
      dispatch(addBlogsFailure(e))
    }
  }

  const onBlogsLoaded = (blogs) => {
    dispatch(addBlogsSuccsess(blogs))
  }

  const nextPage = (page) => {
    setOffset((page - 1) * 10)
  }

  const elements = blogs.map((blog) => {
    return <BlogListItem key={blog.slug} data={blog} />
  })

  const errorMessage = error ? <ErrorIndicator message={error} /> : null
  const spinner = loading ? <Spinner /> : null
  const content = spinner || errorMessage || elements

  return (
    <>
      {!isLoggedIn && <Redirect to="/sign-in" />}
      <div className={classes.blogList}>
        {content}
        <div className={classes.pagination}>
          <Pagin nextPage={nextPage} pages={pages} />
        </div>
      </div>
    </>
  )
}

export default BlogList
