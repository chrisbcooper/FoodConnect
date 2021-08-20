import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import restaurantReducer from './restaurants';
import groupReducer from './groups';
import profileReducer from './profiles';

export const store = configureStore({
    reducer: {
        user: userReducer,
        restaurant: restaurantReducer,
        group: groupReducer,
        profile: profileReducer,
    },
});
