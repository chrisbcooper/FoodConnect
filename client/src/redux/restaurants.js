import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import client from '../api/client';
import { setAuthToken } from '../api/client';

export const loadRestaurants = createAsyncThunk('restaurants/load_all', async ({ sort }) => {
    setAuthToken(localStorage.token);
    try {
        const res = await client.post('/restaurants', {
            text: sort,
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

export const wishRestaurant = createAsyncThunk('restaurants/wish', async ({ id }) => {
    setAuthToken(localStorage.token);
    try {
        const res = await client.post(`/restaurants/${id}/addwish`);
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const unwishRestaurant = createAsyncThunk('restaurants/unwish', async ({ id }) => {
    setAuthToken(localStorage.token);
    try {
        const res = await client.post(`/restaurants/${id}/removewish`);
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const likeRestaurant = createAsyncThunk('restaurants/like', async ({ id }) => {
    setAuthToken(localStorage.token);
    try {
        const res = await client.post(`/restaurants/${id}/like`);
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const unlikeRestaurant = createAsyncThunk('restaurants/unlike', async ({ id }) => {
    setAuthToken(localStorage.token);
    try {
        const res = await client.post(`/restaurants/${id}/unlike`);
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const visitRestaurant = createAsyncThunk('restaurants/visit', async ({ id }) => {
    setAuthToken(localStorage.token);
    try {
        const res = await client.post(`/restaurants/${id}/addvisit`);
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const unvisitRestaurant = createAsyncThunk('restaurants/unvisit', async ({ id }) => {
    setAuthToken(localStorage.token);
    try {
        const res = await client.post(`/restaurants/${id}/removevisit`);
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
        [wishRestaurant.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.restaurant = action.payload;
        },
        [wishRestaurant.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [wishRestaurant.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        [unwishRestaurant.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.restaurant = action.payload;
        },
        [unwishRestaurant.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [unwishRestaurant.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        [likeRestaurant.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.restaurant = action.payload;
        },
        [likeRestaurant.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [likeRestaurant.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        [unlikeRestaurant.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.restaurant = action.payload;
        },
        [unlikeRestaurant.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [unlikeRestaurant.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        [visitRestaurant.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.restaurant = action.payload;
        },
        [visitRestaurant.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [visitRestaurant.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        [unvisitRestaurant.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.restaurant = action.payload;
        },
        [unvisitRestaurant.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [unvisitRestaurant.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

export default restaurantSlice.reducer;
