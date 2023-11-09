import { configureStore } from '@reduxjs/toolkit';

import blog from './blog';

const store = configureStore({
  reducer: blog,
});

export default store;
