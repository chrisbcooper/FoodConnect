import express from 'express';
import { body, validationResult } from 'express-validator';

import config from '@app/config';
import { upload } from '@app/middleware/upload';

import User from '@app/models/user';
import Review from '@app/models/review';

import auth from '@app/middleware'

const router = express.Router();

// Add a review
// Public

router.post('/', [
    auth,
    body('text', 'Text is required').not().isEmpty(),
    body('stars', 'Stars are required').not().isEmpty(),
    body('restaurant', 'Please include a restaurant').not().isEmpty(),
    upload.single('image')
], async (req, res) => {

    const body = Object.assign({},req.body);

    const errors = validationResult(body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { text, stars, restaurant } = body;
    const userID = req.user.id;

    try {

        const user = await User.findOne({ _id: userID });

        if(!user) {
            return res.status(400).json({
                error: {
                    message: 'User does not exist'
                }
            })
        }

        let image;
        if(req.file) {
            image = req.file.locationl;
        }
        
        const review = new Review({
            user: userID,
            text,
            stars,
            restaurant_id: restaurant,
            image
        });

        user.reviews.unshift({ review: review._id });

        await user.save();
        await review.save();

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

// Delete Review
// Private

router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;
    const userID = req.user.id;

    try {
        const user = await User.findOne({ _id: userID });

        if(!user) {
            return res.status(400).json({
                error: {
                    message: 'User does not exist'
                }
            })
        }

        const review = await Review.findOne({ _id: id });

        if(!review) {
            return res.status(400).json({
                error: {
                    message: 'Review does not exist'
                }
            })
        }

        await User.updateOne({
            _id: userID
        }, {
            $pull: {
                'reviews': {
                    review: review._id
                }
            }
        });

        await Review.deleteOne({ _id: id });

        res.json({
            'message': 'SUCCESS'
        })

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            errors: [
                {
                    message: 'Internal server error',
                },
            ],
        });
    }
});

export default router;
