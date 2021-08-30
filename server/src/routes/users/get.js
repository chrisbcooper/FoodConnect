import express from 'express';

const router = express.Router();

import User from '../../models/user.js';

import auth from '../../middleware/index.js';

// Get all users
// Public endpoint

router.get('/', async (req, res) => {
    try {
        const users = await User.find(
            {},
            {
                password: 0,
                email: 0,
            }
        );

        res.json(users);
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

// Get all following users
// Private endpoint

router.get('/following', auth, async (req, res) => {
    const userID = req.user.id;
    try {
        const user = await User.findOne({
            _id: userID,
        });

        const following = user.following.map((item) => {
            return item.following_id;
        });

        const users = await User.find(
            {
                _id: following,
            },
            {
                email: 0,
                password: 0,
            }
        ).populate([
            'groups.group',
            'reviews.review',
            'wishlist.restaurant',
            'liked_restaurants.restaurant',
            'visited_restaurants.restaurant',
            'posts.post',
        ]);

        return res.json(users);
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

// Get Current User
// Private Endpoint

router.get('/me', auth, async (req, res) => {
    try {
        const _id = req.user.id;

        const user = await User.findOne({
            _id,
        })
            .select('-password -email')
            .populate([
                'groups.group',
                'reviews.review',
                'wishlist.restaurant',
                'liked_restaurants.restaurant',
                'visited_restaurants.restaurant',
                'posts.post',
            ]);

        if (!user) {
            res.status(400).json({
                errors: [
                    {
                        message: 'User not found',
                    },
                ],
            });
        }

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json();
    }
});

// Get Specific User
// Private Endpoint

router.get('/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id;

        const user = await User.findOne({
            _id,
        })
            .select('-password -email')
            .populate([
                'groups.group',
                'reviews.review',
                'wishlist.restaurant',
                'liked_restaurants.restaurant',
                'visited_restaurants.restaurant',
                'posts.post',
            ]);

        if (!user) {
            res.status(400).json({
                errors: [
                    {
                        message: 'User not found',
                    },
                ],
            });
        }

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            errors: [
                {
                    message: 'Internal Server Error',
                },
            ],
        });
    }
});

export default router;
