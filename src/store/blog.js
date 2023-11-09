import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';

import BlogApi from '../services/blog';

const Api = new BlogApi();
console.log(Api);

const initialState = {
  posts: [],
  page: 1,
  totalPages: 1,
  currentPost: {},
  user: {},
  authorized: true,
  loading: true,
  error: '',
};

const blog = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    clearPost: (state) => {
      return { ...state, currentPost: {} };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      return {
        ...state,
        posts: action.payload.articles,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
        loading: false,
      };
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      return { ...state, currentPost: action.payload };
    });

    builder.addCase(register.fulfilled, (state, action) => {
      return { ...state, user: action.payload, authorized: Boolean(action.payload.username) };
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      const { username, email, image } = action.payload;
      const userData = { username, email, image };
      return { ...state, user: userData, authorized: Boolean(userData?.username) };
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      // eslint-disable-next-line no-unused-vars
      const { token, ...userData } = action.payload;
      return { ...state, user: userData, authorized: Boolean(userData?.username) };
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      if (!action?.payload?.username) return { ...state, user: {}, authorized: false };
      // eslint-disable-next-line no-unused-vars
      const { token, ...userData } = action.payload;
      return { ...state, user: userData, authorized: Boolean(userData?.username) };
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      return { ...state, currentPost: action.payload };
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      return { ...state, currentPost: action.payload };
    });
    builder.addCase(addLike.fulfilled, (state, action) => {
      const { posts: currentPosts } = current(state);

      const updatedPosts = [...currentPosts].map((post) => {
        return post.slug === action.payload.slug ? action.payload : post;
      });
      return { ...state, posts: updatedPosts, currentPost: action.payload };
    });
    builder.addCase(removeLike.fulfilled, (state, action) => {
      const { posts: currentPosts } = current(state);

      const updatedPosts = [...currentPosts].map((post) => {
        return post.slug === action.payload.slug ? action.payload : post;
      });
      return { ...state, posts: updatedPosts, currentPost: action.payload };
    });
    builder.addCase(removePost.fulfilled, (state) => {
      return { ...state, currentPost: {} };
    });
    builder.addCase(logOut.fulfilled, (state) => {
      return { ...state, authorized: false, user: {} };
    });
    builder.addMatcher(
      (action) => action.type.endsWith('/pending'),
      (state) => {
        return { ...state, loading: true };
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith('/rejected'),
      (state, action) => {
        return { ...state, loading: false, error: action.error.message };
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith('/fulfilled'),
      (state) => {
        return { ...state, loading: false };
      }
    );
  },
});

export const { clearPost } = blog.actions;

export const getPosts = createAsyncThunk('blog/getPosts', async (page) => {
  const res = await Api.articles.getList(page);
  if (res.errors) return Promise.reject('Something goes wrong');
  return res;
});

export const getPost = createAsyncThunk('blog/getPost', async (slug) => {
  const res = await Api.articles.get(slug);
  if (res.errors) return Promise.reject('Something goes wrong');
  return res.article;
});

export const addLike = createAsyncThunk('blog/addLike', async (slug) => {
  const res = await Api.articles.addLike(slug);
  if (res.errors) return Promise.reject('Please login to like the post');
  return res.article;
});

export const removeLike = createAsyncThunk('blog/removeLike', async (slug) => {
  const res = await Api.articles.removeLike(slug);
  if (res.errors) return Promise.reject('Please login to unlike the post');
  return res.article;
});

export const createPost = createAsyncThunk('blog/createPost', async (postData) => {
  const res = await Api.articles.create(postData);
  if (res.errors) return Promise.reject('Something goes wrong');
  return res.article;
});

export const updatePost = createAsyncThunk('blog/updatePost', async (postData) => {
  const { slug, ...post } = postData;
  const res = await Api.articles.edit(slug, post);
  if (res.errors || !res.article) return Promise.reject('You coudn`t edit this post');
  return res.article;
});

export const removePost = createAsyncThunk('blog/removePost', async (slug) => {
  const res = await Api.articles.delete(slug);
  if (res.errors) return Promise.reject('Something goes wrong');
  return Promise.resolve();
});

export const register = createAsyncThunk('blog/register', async (userData) => {
  const res = await Api.user.register(userData);
  if (res.errors) return Promise.reject('Something goes wrong');
  return res.user;
});

export const signin = createAsyncThunk('blog/signin', async (userData) => {
  const res = await Api.user.login(userData);
  if (res.errors) return Promise.reject('Password or email is incorrect');
  return res.user;
});

export const getProfile = createAsyncThunk('blog/getProfile', async () => {
  if (!Api._token()) return Promise.resolve({});
  const res = await Api.user.get();
  if (res.errors) return Promise.reject('Unauthorized');
  return res.user;
});

export const updateUser = createAsyncThunk('blog/updateUser', async (userData) => {
  const res = await Api.user.update(userData);
  if (res.errors) return Promise.reject('Email or Username is incorrect or used');
  return res.user;
});

export const logOut = createAsyncThunk('blog/logOut', async () => {
  const res = Api.user.logOut();
  return res;
});

export default blog.reducer;
