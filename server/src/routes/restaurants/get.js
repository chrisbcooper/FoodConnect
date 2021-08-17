import express from 'express';

import Restaurant from '@app/models/restaurant';
import User from '@app/models/user';

const router = express.Router();

// Get all reviews for Restaurant
// Public

router.get('/:id', async (req, res) => {
    
    const { id } = req.params;

    try {
        const restaurant = await Restaurant.findOne({ yelp_id: id });

        if(!restaurant) {
            restaurant = new Restaurant({
                yelp_id: id
            });
            await restaurant.save();
        }

        res.json(restaurant);
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
