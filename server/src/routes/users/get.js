import express from 'express';

const router = express.Router();

import User from '@app/models/user';

import auth from '@app/middleware';

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

// Get Current User
// Private Endpoint

router.get('/me', auth, async (req, res) => {
    try {
        const _id = req.user.id;

        const user = await User.findOne({
            _id,
        })
            .select('-password -email')
            .populate(['reviews.review']);

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
            .populate(['groups.group', 'reviews.review']);

        console.log(user);

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
