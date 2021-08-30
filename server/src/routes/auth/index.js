import express from 'express';

const router = express.Router();

import User from '../../models/user.js';

import auth from '../../middleware/index.js';

// Get User and return token
// Private

router.get('/', auth, async (req, res) => {
    const _id = req.user.id;
    try {
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
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server errors');
    }
});

export default router;
