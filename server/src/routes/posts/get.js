import express from 'express';
const router = express.Router();

import auth from '@app/middleware';

import Post from '@app/models/post';

// Get all posts
// Public 

router.get('/', async (req, res) => {

    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            errors: [
                {
                message: 'Internal Server Error'
                }
            ]
        })
    }

});

// Get current user posts
// Private

router.get('/me', auth, async (req, res) => {

    const _id = req.user.id;

    try {

        const posts = await Post.find({ user: _id });
        return res.json(posts);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            errors: [
                {
                message: 'Internal Server Error'
                }
            ]
        })
    }
});

// Get current user posts
// Private

router.get('/:id', auth, async (req, res) => {

    const { id } = req.params;

    try {
        const posts = await Post.find({ user: id });
        return res.json(posts);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            errors: [
                {
                message: 'Internal Server Error'
                }
            ]
        })
    }
});


export default router;