import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

import { addBlogsStarted, addBlogsSuccsess, addBlogsFailure } from '../../redux/actions'
import BlogService from '../../services/blog-services'
import BlogListItem from '../blogListItem'
import ErrorIndicator from '../error-indicator/error-indicator'
import Spinner from '../spinner/spinner'
import Pagin from '../pagination/pagination'

import classes from './blogList.module.scss'

function BlogList() {
  const [offset, setOffset] = useState(0)
  const [pages, sePages] = useState(null)
  const { blogs, error, loading } = useSelector((state) => state.blogs)
  const token = useSelector((state) => state.user.token)
  const dispatch = useDispatch()

  const isLoggedIn = token ? true : false
  const { getArticles } = BlogService()

  useEffect(() => {
    updateBlogs()
  }, [offset])

  const updateBlogs = async () => {
    dispatch(addBlogsStarted())
    try {
      const res = await getArticles(offset, token)
      onBlogsLoaded(res.articles)
      sePages(Math.ceil(res.articlesCount / 10))
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
