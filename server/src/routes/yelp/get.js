import express from 'express';
import axios from 'axios';

import config from '@app/config';

const router = express.Router();

// Search restaurants
// Public

router.get('/', async (req, res) => {
    const { text } = req.body;

    try {
        const { data } = await axios.get(`${config.YELP_URL}/businesses/search`,
        { 
            headers: {
                "Authorization" : `Bearer ${config.YELP_API_KEY}`
            },
            params: {
                term: text,
                location: "Los Angeles"
            }
        });

        res.json(data);
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

// Get Specific Restaurant
// Public

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const { data } = await axios.get(`${config.YELP_URL}/businesses/${id}`,
                        { headers: {"Authorization" : `Bearer ${config.YELP_API_KEY}`} });
        res.json(data);
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
