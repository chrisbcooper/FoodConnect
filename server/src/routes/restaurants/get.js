import express from 'express';
import axios from 'axios';

import config from '../../config/index.js';

import Restaurant from '../../models/restaurant.js';

const router = express.Router();

// Get specific restaurant
// Public

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const restaurant = await Restaurant.findOne({ yelp_id: id }).populate([
            'reviews.review',
            'wishlist.user',
            'visited.user',
            'likes.user',
        ]);

        if (!restaurant) {
            //confirming that the ID is a correct yelp id
            const response = await axios.get(`${config.YELP_URL}/businesses/${id}`, {
                headers: { Authorization: `Bearer ${config.YELP_API_KEY}` },
            });

            const newRestaurant = new Restaurant({
                yelp_id: response.data.id,
                photos: response.data.photos,
                name: response.data.name,
            });
            await newRestaurant.save();
            return res.json(newRestaurant);
        }

        return res.json(restaurant);
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

// Get all restaurants
// Public

router.post('/', async (req, res) => {
    const { text } = req.body;
    try {
        const restaurants = await Restaurant.find().sort({ field: 'asc', [text]: -1 });

        if (!restaurants) {
            return res.status(400).json({
                errors: [
                    {
                        message: 'No restaurants available',
                    },
                ],
            });
        }

        res.json(restaurants);
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

// Get all restaurants
// Public

router.get('/', async (req, res) => {
    const { restaurants: restList } = req.body;

    try {
        const restaurants = await Restaurant.find({
            yelp_id: restList,
        });

        if (!restaurants) {
            return res.status(400).json({
                errors: [
                    {
                        message: 'No restaurants available',
                    },
                ],
            });
        }

        res.json(restaurants);
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
