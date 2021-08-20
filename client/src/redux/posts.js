import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import client from '../api/client';
import { setAuthToken } from '../api/client';

export const loadPosts = createAsyncThunk('post/load_all', async () => {
    setAuthToken(localStorage.token);
    try {
        const res = await client.get('/posts');
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const loadPostsFollowing = createAsyncThunk('post/load_following', async ({ id }) => {
    setAuthToken(localStorage.token);
    try {
        const res = await client.get(`/posts/following`);
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const loadPost = createAsyncThunk('post/load_one', async ({ id }) => {
    setAuthToken(localStorage.token);
    try {
        const res = await client.get(`/posts/${id}`);
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const loadPostMe = createAsyncThunk('post/load_me', async () => {
    setAuthToken(localStorage.token);
    try {
        const res = await client.get(`/posts/me`);
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const loadPostUser = createAsyncThunk('post/load_user', async ({ id }) => {
    setAuthToken(localStorage.token);
    try {
        const res = await client.get(`/posts/user/${id}`);
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const restaurantSlice = createSlice({
    name: 'post',
    initialState: {
        isLoading: false,
        posts: [],
        post: {},
        error: null,
    },
    reducers: {},
    extraReducers: {
        [loadPosts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.posts = action.payload;
        },
        [loadPosts.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [loadPosts.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        [loadPostsFollowing.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.posts = action.payload;
        },
        [loadPostsFollowing.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [loadPostsFollowing.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        [loadPost.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.post = action.payload;
        },
        [loadPost.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [loadPost.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        [loadPostMe.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.post = action.payload;
        },
        [loadPostMe.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [loadPostMe.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        [loadPostUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.post = action.payload;
        },
        [loadPostUser.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [loadPostUser.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

export default restaurantSlice.reducer;
