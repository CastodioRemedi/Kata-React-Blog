import {
  ADD_BLOGS_STARTED,
  ADD_BLOGS_SUCCESS,
  ADD_BLOGS_FAILURE,
  ADD_BLOG_STARTED,
  ADD_BLOG_SUCCESS,
  ADD_BLOG_FAILURE,
  DELETE_BLOG_STARTED,
  DELETE_BLOG_SUCCESS,
  DELETE_BLOG_FAILURE,
} from './types'

const initialBlogsState = {
  blogs: [],
  error: null,
  loading: true,
}

export const blogsReducer = (state = initialBlogsState, action) => {
  switch (action.type) {
    case ADD_BLOGS_STARTED:
      return { ...state, loading: true }
    case ADD_BLOGS_SUCCESS:
      return { ...state, loading: false, blogs: action.payload }
    case ADD_BLOGS_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

const initialBlogState = {
  blog: {},
  error: null,
  loading: true,
}

export const blogReducer = (state = initialBlogState, action) => {
  switch (action.type) {
    case ADD_BLOG_STARTED:
    case DELETE_BLOG_STARTED:
      return { ...state, loading: true }
    case ADD_BLOG_SUCCESS:
      return { ...state, loading: false, blog: action.payload }
    case DELETE_BLOG_SUCCESS:
      return { ...state, loading: false, blog: {} }
    case ADD_BLOG_FAILURE:
    case DELETE_BLOG_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
