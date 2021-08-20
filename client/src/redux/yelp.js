import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import client, { setAuthToken } from '../api/client';

export const loadRestaurants = createAsyncThunk('yelp/load_all', async ({ search }) => {
    setAuthToken(localStorage.token);
    try {
        const res = await client.post('/yelp/search', { text: search });
        return res.data.businesses;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const yelpSlice = createSlice({
    name: 'yelp',
    initialState: {
        isLoading: false,
        restaurants: [],
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
    },
});

export default yelpSlice.reducer;
