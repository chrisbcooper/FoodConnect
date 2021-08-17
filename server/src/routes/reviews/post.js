import express from 'express';
import { body, validationResult } from 'express-validator';

import { upload } from '@app/middleware/upload';

import User from '@app/models/user';
import Review from '@app/models/review';
import Restaurant from '@app/models/restaurant';

import auth from '@app/middleware'

const router = express.Router();

// Add a review
// Private

router.post('/', [
    auth,
    body('text', 'Text is required').notEmpty(),
    body('restaurant', 'Restaurant is required').notEmpty(),
    upload.single('image')
], async (req, res) => {

    const userID = req.user.id;

    const body = Object.assign({},req.body);

    const errors = validationResult(body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { text } = body;
    const restaurantID = body.restaurant;

    try {

        const user = await User.findOne({ _id: userID });
        const restaurant = await Restaurant.findOne({ _id: restaurantID });

        if(!user || !restaurant) {
            return res.status(400).json({
                error: {
                    message: 'User or Restaurant not found'
                }
            })
        }

        let image;
        if(req.file) {
            image = req.file.location;
        }

        const review = new Review({
            restaurant_id: restaurant._id,
            text,
            user: userID,
        });

        await review.save();

        user.reviews.unshift({ review: review._id});
        restaurant.reviews.unshift({ review: review._id });

        await user.save();
        await restaurant.save();

        res.json(review);

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


// Delete a review
// Private

router.delete('/:id', auth, async (req, res) => {

    const userID = req.user.id;

    const { id } = req.params;

    try {

        const user = await User.findOne({ _id: userID });

        if(!user) {
            return res.status(400).json({
                error: {
                    message: 'User not found'
                }
            })
        }

        const review = await Review.findOne({ _id: id });

        if(!review) {
            return res.status(400).json({
                error: {
                    message: 'Review not found'
                }
            })
        }

        const restaurant = await Restaurant.findOne({ _id: review.restaurant_id });

        if(!restaurant) {
            return res.status(400).json({
                error: {
                    message: 'Restaurant not found'
                }
            })
        }

        if(user.reviews.filter((user) => user.review.toString() === id).length === 0) {
            return res.status(400).json({
                errors: [
                    {
                        'message': 'Not users review'
                    }
                    
                ]
            })
        }

        if(restaurant.reviews.filter((review) => review.review.toString() === id).length === 0) {
            return res.status(400).json({
                errors: [
                    {
                        'message': 'Error finding review'
                    }
                    
                ]
            })
        }

        const removeUserIndex = user.reviews.map((user) => user.review.toString()).indexOf(id);
        const removeRestaurantIndex = restaurant.reviews.map((review) => review.review.toString()).indexOf(id);

        user.reviews.splice(removeUserIndex, 1);
        restaurant.reviews.splice(removeRestaurantIndex, 1);

        await user.save();
        await restaurant.save();

        await Review.deleteOne({ _id: id });

        res.json({
            'message': 'SUCCESS'
        })

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



// Like a review
// Private

router.post('/:id/like', auth, async (req, res) => {
   
    const userID = req.user.id;
    const { id } = req.params;

    try {

        const review = await Review.findById(id);

        if(!review) {
            res.status(400).json({
                errors: [
                    {
                        'message': 'Review does not exist',
                    }
                ]
            })
        }

        if(review.likes.filter((like) => like.like.toString() === userID).length > 0) {
            return res.status(400).json({
                errors: [
                    {
                        'message': 'Review already liked'
                    }
                    
                ]
            })
        }

        review.likes.unshift({ like: userID });
        await review.save();

        return res.json(review.likes);

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


// Unlike a review
// Private

router.post('/:id/unlike', auth, async (req, res) => {
   
    const userID = req.user.id;
    const { id } = req.params;

    try {

        const review = await Review.findById(id);

        if(!review) {
            return res.status(400).json({
                errors: [
                    {
                        'message': 'Review does not exist',
                    }
                ]
            })
        }

        if(review.likes.filter((like) => like.like.toString() === userID).length === 0) {
            return res.status(400).json({
                errors: [
                    {
                        'message': 'Post not liked'
                    }
                    
                ]
            })
        }

        //Get remove index
        const removeIndex = review.likes.map((like) => like.like.toString()).indexOf(userID);
  
        review.likes.splice(removeIndex, 1);
        await review.save();

        return res.json(review.likes);

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
