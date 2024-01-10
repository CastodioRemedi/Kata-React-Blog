import { combineReducers } from 'redux'

import { blogsReducer, blogReducer } from './blogsReducer'
import { userReducer } from './userReducer'

export const rootReducer = combineReducers({
  blogs: blogsReducer,
  blog: blogReducer,
  user: userReducer,
})
