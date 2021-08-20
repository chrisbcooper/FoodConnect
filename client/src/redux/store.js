import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import restaurantReducer from './restaurants';
import groupReducer from './groups';
import profileReducer from './profiles';
import postReducer from './posts';
import reviewReducer from './reviews';
import yelpReducer from './yelp';

export const store = configureStore({
    reducer: {
        user: userReducer,
        restaurant: restaurantReducer,
        group: groupReducer,
        profile: profileReducer,
        posts: postReducer,
        reviews: reviewReducer,
        yelp: yelpReducer,
    },
});
