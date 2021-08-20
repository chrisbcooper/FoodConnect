import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import client, { setAuthToken } from '../api/client';
import formClient, { setFormAuthToken } from '../api/clientForm';

export const loadPosts = createAsyncThunk('post/load_all', async ({ type }) => {
    setAuthToken(localStorage.token);
    try {
        if (type === 'following') {
            const res = await client.get(`/posts/following`);
            return res.data;
        } else {
            const res = await client.get('/posts');
            return res.data;
        }
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

export const postCreate = createAsyncThunk('post/create', async ({ caption, group, image }) => {
    setFormAuthToken(localStorage.token);
    try {
        const formData = new FormData();
        formData.append('caption', caption);
        if (group) {
            formData.append('group', group);
        }
        if (image) {
            formData.append('image', image, image.name);
        }

        const res = await formClient.post(`/posts`, formData);
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const deletePost = createAsyncThunk('post/delete', async ({ id }) => {
    setFormAuthToken(localStorage.token);
    try {
        const res = await formClient.delete(`/posts/${id}`);
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const likePost = createAsyncThunk('posts/like', async ({ id }) => {
    setFormAuthToken(localStorage.token);
    try {
        const res = await formClient.post(`/posts/${id}/like`);
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const unlikePost = createAsyncThunk('posts/unlike', async ({ id }) => {
    setFormAuthToken(localStorage.token);
    try {
        const res = await formClient.post(`/posts/${id}/unlike`);
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const commentPost = createAsyncThunk('reviews/comment', async ({ id, text }) => {
    setAuthToken(localStorage.token);
    try {
        const res = await client.post(`/posts/${id}/comment`, { text });
        return res.data;
    } catch (err) {
        console.error(err.response.data);
        throw err.response.data.errors;
    }
});

export const deleteCommentPost = createAsyncThunk('posts/delete-comment', async ({ id, comment_id }) => {
    setAuthToken(localStorage.token);
    try {
        const res = await client.delete(`/posts/${id}/comment/${comment_id}`);
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
        [postCreate.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.post = action.payload;
        },
        [postCreate.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [postCreate.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        [deletePost.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.post = {};
        },
        [deletePost.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [deletePost.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        [likePost.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.post = action.payload;
        },
        [likePost.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [likePost.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        [unlikePost.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.post = action.payload;
        },
        [unlikePost.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [unlikePost.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        [commentPost.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.post = action.payload;
        },
        [commentPost.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [commentPost.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        [deleteCommentPost.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.post = action.payload;
        },
        [deleteCommentPost.pending]: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        [deleteCommentPost.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

export default restaurantSlice.reducer;
