import { configureStore } from '@reduxjs/toolkit'

import userReducer from '@redux/user/slice';

export default configureStore({
  reducer: {
    userReducer
  },
})