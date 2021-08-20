import express from 'express';
const router = express.Router();

import auth from '@app/middleware';

import Post from '@app/models/post';
import User from '../../models/user';

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
                    message: 'Internal Server Error',
                },
            ],
        });
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
                    message: 'Internal Server Error',
                },
            ],
        });
    }
});

// Get posts specific to user
// Private

router.get('/following', auth, async (req, res) => {
    const userID = req.user.id;

    try {
        const user = await User.findOne({
            _id: userID,
        });

        if (!user) {
            res.status(400).json({
                errors: [
                    {
                        message: 'Error loading user',
                    },
                ],
            });
        }

        const following = user.following.map((item) => {
            return item.following_id;
        });

        const posts = await Post.find({ user: following });
        return res.json(posts);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            errors: [
                {
                    message: 'Internal Server Error',
                },
            ],
        });
    }
});

// Get specific posts
// Private

router.get('/:id', auth, async (req, res) => {
    const { id } = req.params;

    try {
        const posts = await Post.findOne({ _id: id });
        return res.json(posts);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            errors: [
                {
                    message: 'Internal Server Error',
                },
            ],
        });
    }
});

// Get posts specific to user
// Private

router.get('/user/:id', auth, async (req, res) => {
    const { id } = req.params;

    try {
        const posts = await Post.find({ user: id });
        return res.json(posts);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            errors: [
                {
                    message: 'Internal Server Error',
                },
            ],
        });
    }
});

export default router;
