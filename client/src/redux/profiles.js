import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import client from '../api/client';
import { setAuthToken } from '../api/client';

export const loadProfiles = createAsyncThunk('profiles/load_all', async ({ sort }) => {
    setAuthToken(localStorage.token);
    try {
        if (sort === 'all') {
            const res = await client.get('/users');
            return res.data;
        } else {
            const res = await client.get('/users/following');
            return res.data;
        }
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const loadProfile = createAsyncThunk('profiles/load', async ({ id }) => {
    setAuthToken(localStorage.token);
    try {
        const res = await client.get(`/users/${id}`);
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const followProfile = createAsyncThunk('profiles/follow', async ({ id }) => {
    try {
        const res = await client.post(`users/${id}/follow`);
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const unfollowProfile = createAsyncThunk('profiles/unfollow', async ({ id }) => {
    try {
        const res = await client.post(`users/${id}/unfollow`);
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profile: {},
        profiles: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [loadProfiles.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.profiles = action.payload;
        },
        [loadProfiles.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [loadProfiles.rejected]: (state, action) => {
            state.error = 'ERROR';
            state.isLoading = false;
        },
        [loadProfile.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.profile = action.payload;
        },
        [loadProfile.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [loadProfile.rejected]: (state, action) => {
            state.error = 'ERROR';
            state.isLoading = false;
        },
        [followProfile.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.profile = action.payload;
        },
        [followProfile.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [followProfile.rejected]: (state, action) => {
            state.error = 'ERROR';
            state.isLoading = false;
        },
        [unfollowProfile.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.profile = action.payload;
        },
        [unfollowProfile.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [unfollowProfile.rejected]: (state, action) => {
            state.error = 'ERROR';
            state.isLoading = false;
        },
    },
});

export default profileSlice.reducer;
