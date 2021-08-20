import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import restaurantReducer from './restaurants';
import groupReducer from './groups';

export const store = configureStore({
    reducer: {
        user: userReducer,
        restaurant: restaurantReducer,
        group: groupReducer,
    },
});
