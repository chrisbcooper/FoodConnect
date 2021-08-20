import express from 'express';

import Review from '@app/models/review';

const router = express.Router();

// Get All Reviews
// Public

router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 }).limit(20);

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
