import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import restaurantReducer from './restaurants';

export const store = configureStore({
    reducer: {
        user: userReducer,
        restaurant: restaurantReducer,
    },
});
