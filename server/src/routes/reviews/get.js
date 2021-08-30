import express from 'express';

import Review from '../../models/review.js';
import User from '../../models/user.js';

import auth from '../../middleware/index.js';

const router = express.Router();

// Get All Reviews
// Public

router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find()
            .sort({ createdAt: -1 })
            .limit(20)
            .populate(['restaurant_id', 'user', 'likes.like']);

        if (!reviews) {
            res.status(400).json({
                errors: [
                    {
                        message: 'Review does not exist',
                    },
                ],
            });
        }

        res.json(reviews);
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

// Get All Reviews
// Public

router.get('/following', auth, async (req, res) => {
    const userID = req.user.id;

    try {
        const user = await User.findOne({
            _id: userID,
        });

        const following = user.following.map((item) => {
            return item.following_id;
        });

        const reviews = await Review.find({
            user: following,
        })
            .sort({ createdAt: -1 })
            .limit(20)
            .populate(['restaurant_id', 'user', 'likes.like']);

        return res.json(reviews);
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

// Get Specific Review
// Public

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const review = await Review.findOne({ _id: id }).populate(['restaurant_id', 'user', 'likes.like']);

        if (!review) {
            res.status(400).json({
                errors: [
                    {
                        message: 'Review does not exist',
                    },
                ],
            });
        }

        res.json(review);
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
