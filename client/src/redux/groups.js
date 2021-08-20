import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import client, { setAuthToken } from '../api/client';
import formClient, { setFormAuthToken } from '../api/clientForm';

export const loadGroups = createAsyncThunk('groups/load_all', async () => {
    setAuthToken(localStorage.token);
    try {
        const res = await client.get('/groups');
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const loadGroup = createAsyncThunk('groups/load_one', async ({ id }) => {
    setAuthToken(localStorage.token);
    try {
        const res = await client.get(`/groups/${id}`);
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const loadGroupPosts = createAsyncThunk('groups/load_posts', async ({ id }) => {
    setAuthToken(localStorage.token);
    try {
        const res = await client.get(`/groups/${id}/posts`);
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const createGroup = createAsyncThunk('groups/create', async ({ name, bio, image }) => {
    setFormAuthToken(localStorage.token);
    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('bio', bio);
        if (image) {
            formData.append('image', image, image.name);
        }

        const res = await formClient.post(`/groups`, formData);
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const deleteGroup = createAsyncThunk('groups/delete', async ({ id }) => {
    setFormAuthToken(localStorage.token);
    try {
        const res = await formClient.delete(`/groups/${id}`);
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const followGroup = createAsyncThunk('groups/follow', async ({ id }) => {
    setFormAuthToken(localStorage.token);
    try {
        const res = await formClient.post(`/groups/${id}/follow`);
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const unfollowGroup = createAsyncThunk('groups/unfollow', async ({ id }) => {
    setFormAuthToken(localStorage.token);
    try {
        const res = await formClient.post(`/groups/${id}/unfollow`);
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const groupSlice = createSlice({
    name: 'group',
    initialState: {
        isLoading: false,
        groups: [],
        group: {},
        groupPosts: [],
        error: null,
    },
    reducers: {},
    extraReducers: {
        [loadGroups.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.groups = action.payload;
        },
        [loadGroups.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [loadGroups.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        [loadGroup.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.group = action.payload;
        },
        [loadGroup.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [loadGroup.rejected]: (state, action) => {
            state.error = 'ERROR';
            state.isLoading = false;
        },
        [loadGroupPosts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.posts = action.payload;
        },
        [loadGroupPosts.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [loadGroupPosts.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        [createGroup.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.group = action.payload;
        },
        [createGroup.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [createGroup.rejected]: (state, action) => {
            state.error = 'ERROR';
            state.isLoading = false;
        },
        [deleteGroup.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.group = action.payload;
        },
        [deleteGroup.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [deleteGroup.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        [followGroup.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.group = action.payload;
        },
        [followGroup.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [followGroup.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        [unfollowGroup.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.group = action.payload;
        },
        [unfollowGroup.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [unfollowGroup.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

export default groupSlice.reducer;
