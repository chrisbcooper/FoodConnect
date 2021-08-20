import express from 'express';

import Review from '@app/models/review';
import User from '@app/models/user';

import auth from '@app/middleware';

const router = express.Router();

// Get All Reviews
// Public

router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 }).limit(20).populate(['restaurant_id']);

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
            .populate(['restaurant_id']);

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
        const review = await Review.findOne({ _id: id });

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
