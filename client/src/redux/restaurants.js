import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import client from '../api/client';
import { setAuthToken } from '../api/client';

export const loadRestaurants = createAsyncThunk('restaurants/load_all', async ({ restaurants }) => {
    setAuthToken(localStorage.token);
    try {
        const res = await client.post('/restaurants', {
            restaurants,
        });
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const loadRestaurant = createAsyncThunk('restaurants/load_one', async ({ id }) => {
    setAuthToken(localStorage.token);
    try {
        const res = await client.get(`/restaurants/${id}`);
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState: {
        isLoading: false,
        restaurants: [],
        restaurant: {},
        error: null,
    },
    reducers: {},
    extraReducers: {
        [loadRestaurants.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.restaurants = action.payload;
        },
        [loadRestaurants.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [loadRestaurants.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        [loadRestaurant.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.restaurant = action.payload;
        },
        [loadRestaurant.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [loadRestaurant.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

export default restaurantSlice.reducer;
