import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import client from '../api/client';
import { setAuthToken } from '../api/client';

export const loadUser = createAsyncThunk('user/load', async () => {
    setAuthToken(localStorage.token);
    try {
        const res = await client.get('/auth');
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const register = createAsyncThunk('user/register', async ({ email, password, name }) => {
    try {
        const res = await client.post('/users', { email, password, name });
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const login = createAsyncThunk('user/login', async ({ email, password }) => {
    try {
        const res = await client.post('/users/login', { email, password });
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const logout = createAsyncThunk('user/logout', async () => {});

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: localStorage.getItem('token'),
        isAuthenticated: true,
        isLoading: false,
        data: {},
        error: null,
    },
    reducers: {},
    extraReducers: {
        [loadUser.fulfilled]: (state, action) => {
            state.token = localStorage.token;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.error = null;
            state.data = action.payload;
            console.log(action.payload);
        },
        [loadUser.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [loadUser.rejected]: (state, action) => {
            localStorage.removeItem('token');
            state.error = action.payload;
            state.isLoading = false;
            state.token = null;
            state.isAuthenticated = false;
        },
        [register.fulfilled]: (state, action) => {
            localStorage.setItem('token', action.payload.token);
            state.isAuthenticated = true;
            state.isLoading = false;
            state.error = null;
            state.token = action.payload.token;
        },
        [register.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [register.rejected]: (state, action) => {
            localStorage.removeItem('token');
            state.error = action.payload;
            state.isLoading = false;
            state.isAuthenticated = false;
            state.token = null;
        },
        [login.fulfilled]: (state, action) => {
            localStorage.setItem('token', action.payload.token);
            state.isAuthenticated = true;
            state.isLoading = false;
            state.error = null;
            state.token = action.payload.token;
        },
        [login.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [login.rejected]: (state, action) => {
            localStorage.removeItem('token');
            state.error = action.payload;
            state.isLoading = false;
            state.isAuthenticated = false;
            state.token = null;
        },
        [logout.fulfilled]: (state, action) => {
            localStorage.removeItem('token');
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
            state.token = null;
            state.data = {};
        },
    },
});

export default userSlice.reducer;
