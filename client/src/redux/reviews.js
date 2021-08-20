import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import client, { setAuthToken } from '../api/client';
import formClient, { setFormAuthToken } from '../api/clientForm';

export const loadReviews = createAsyncThunk('reviews/load_all', async ({ sort }) => {
    setAuthToken(localStorage.token);
    try {
        if (sort === 'all') {
            const res = await client.get('/reviews');
            return res.data;
        } else {
            const res = await client.get('/reviews/following');
            return res.data;
        }
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const loadReview = createAsyncThunk('reviews/load_one', async ({ id }) => {
    setAuthToken(localStorage.token);
    try {
        const res = await client.get(`/reviews/${id}`);
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const reviewCreate = createAsyncThunk('reviews/create', async ({ text, restaurant, stars, image }) => {
    setFormAuthToken(localStorage.token);
    try {
        const formData = new FormData();
        formData.append('text', text);
        formData.append('restaurant', restaurant);
        formData.append('stars', stars);
        if (image) {
            formData.append('image', image, image.name);
        }

        const res = await formClient.post(`/reviews`, formData);
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const deleteReview = createAsyncThunk('reviews/delete', async ({ id }) => {
    setFormAuthToken(localStorage.token);
    try {
        const res = await formClient.delete(`/reviews/${id}`);
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const likeReview = createAsyncThunk('reviews/like', async ({ id }) => {
    setFormAuthToken(localStorage.token);
    try {
        const res = await formClient.post(`/reviews/${id}/like`);
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const unlikeReview = createAsyncThunk('reviews/unlike', async ({ id }) => {
    setFormAuthToken(localStorage.token);
    try {
        const res = await formClient.post(`/reviews/${id}/unlike`);
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const reviewSlice = createSlice({
    name: 'review',
    initialState: {
        isLoading: false,
        reviews: [],
        review: {},
        error: null,
    },
    reducers: {},
    extraReducers: {
        [loadReviews.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.reviews = action.payload;
        },
        [loadReviews.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [loadReviews.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        [loadReview.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.review = action.payload;
        },
        [loadReview.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [loadReview.rejected]: (state, action) => {
            state.error = 'ERROR';
            state.isLoading = false;
        },
        [reviewCreate.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.group = action.payload;
        },
        [reviewCreate.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [reviewCreate.rejected]: (state, action) => {
            state.error = 'ERROR';
            state.isLoading = false;
        },
        [deleteReview.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.review = {};
        },
        [deleteReview.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [deleteReview.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        [likeReview.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.review = action.payload;
        },
        [likeReview.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [likeReview.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        [unlikeReview.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.review = action.payload;
        },
        [unlikeReview.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [unlikeReview.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

export default reviewSlice.reducer;
