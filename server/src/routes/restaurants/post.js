import express from 'express';

import User from '@app/models/user';
import Restaurant from '@app/models/restaurant';

import auth from '@app/middleware';

const router = express.Router();

// Add user to wishlist
// Private
router.post('/:id/addwish', auth, async (req, res) => {
    const userID = req.user.id;
    const { id } = req.params;

    try {
        const user = await User.findOne({ _id: userID });

        if (!user) {
            return res.status(400).json({
                errors: [
                    {
                        message: 'User does not exist',
                    },
                ],
            });
        }

        const restaurant = await Restaurant.findOne({ _id: id });

        if (!restaurant) {
            return res.status(400).json({
                error: {
                    message: 'Restaurant does not exist',
                },
            });
        }

        if (restaurant.wishlist.filter((usr) => usr.user.toString() === userID).length > 0) {
            return res.status(400).json({
                errors: [
                    {
                        message: 'Already in wishlist',
                    },
                ],
            });
        }

        restaurant.wishlist.unshift({ user: userID });
        user.wishlist.unshift({ restaurant: restaurant._id });

        await restaurant.save();
        await user.save();

        return res.json(user.wishlist);
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

// Remove user from wishlist
// Private
router.post('/:id/removewish', auth, async (req, res) => {
    const userID = req.user.id;
    const { id } = req.params;

    try {
        const user = await User.findOne({ _id: userID });

        if (!user) {
            return res.status(400).json({
                error: {
                    message: 'User does not exist',
                },
            });
        }

        const restaurant = await Restaurant.findOne({ _id: id });

        if (!restaurant) {
            return res.status(400).json({
                error: {
                    message: 'Restaurant does not exist',
                },
            });
        }

        if (restaurant.wishlist.filter((usr) => usr.user.toString() === userID).length === 0) {
            return res.status(400).json({
                errors: [
                    {
                        message: 'Not in wishlist',
                    },
                ],
            });
        }

        const removeRestaurantIndex = restaurant.wishlist.map((usr) => usr.user.toString()).indexOf(userID);
        const removeUserIndex = user.wishlist
            .map((rest) => rest.restaurant.toString())
            .indexOf(restaurant._id.toString());

        restaurant.wishlist.splice(removeRestaurantIndex, 1);
        user.wishlist.splice(removeUserIndex, 1);

        await restaurant.save();
        await user.save();

        return res.json(user.wishlist);
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

// Add user to likes
// Private
router.post('/:id/like', auth, async (req, res) => {
    const userID = req.user.id;
    const { id } = req.params;

    try {
        const user = await User.findOne({ _id: userID });

        if (!user) {
            return res.status(400).json({
                error: {
                    message: 'User does not exist',
                },
            });
        }

        const restaurant = await Restaurant.findOne({ _id: id });

        if (!restaurant) {
            return res.status(400).json({
                error: {
                    message: 'Restaurant does not exist',
                },
            });
        }

        if (restaurant.likes.filter((like) => like.like.toString() === userID).length > 0) {
            return res.status(400).json({
                errors: [
                    {
                        message: 'Already in liked restaurant',
                    },
                ],
            });
        }

        restaurant.likes.unshift({ like: userID });
        user.liked_restaurants.unshift({ restaurant: restaurant._id });

        await restaurant.save();
        await user.save();

        return res.json(user.liked_restaurants);
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

// Unlike restaurant
// Private
router.post('/:id/unlike', auth, async (req, res) => {
    const userID = req.user.id;
    const { id } = req.params;

    try {
        const user = await User.findOne({ _id: userID });

        if (!user) {
            return res.status(400).json({
                error: {
                    message: 'User does not exist',
                },
            });
        }

        const restaurant = await Restaurant.findOne({ _id: id });

        if (!restaurant) {
            return res.status(400).json({
                error: {
                    message: 'Restaurant does not exist',
                },
            });
        }

        if (restaurant.likes.filter((usr) => usr.like.toString() === userID).length === 0) {
            return res.status(400).json({
                errors: [
                    {
                        message: 'Not liked',
                    },
                ],
            });
        }

        const removeRestaurantIndex = restaurant.likes.map((like) => like.like.toString()).indexOf(userID);
        const removeUserIndex = user.liked_restaurants
            .map((rest) => rest.restaurant.toString())
            .indexOf(restaurant._id.toString());

        restaurant.likes.splice(removeRestaurantIndex, 1);
        user.liked_restaurants.splice(removeUserIndex, 1);

        await restaurant.save();
        await user.save();

        return res.json(user.liked_restaurants);
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

// Add user to visited
// Private
router.post('/:id/addvisit', auth, async (req, res) => {
    const userID = req.user.id;
    const { id } = req.params;

    try {
        const user = await User.findOne({ _id: userID });

        if (!user) {
            return res.status(400).json({
                error: {
                    message: 'User does not exist',
                },
            });
        }

        const restaurant = await Restaurant.findOne({ _id: id });

        if (!restaurant) {
            return res.status(400).json({
                error: {
                    message: 'Restaurant does not exist',
                },
            });
        }

        if (restaurant.visited.filter((usr) => usr.user.toString() === userID).length > 0) {
            return res.status(400).json({
                errors: [
                    {
                        message: 'Already in visited restaurant',
                    },
                ],
            });
        }

        restaurant.visited.unshift({ user: userID });
        user.visited_restaurants.unshift({ restaurant: restaurant._id });

        await restaurant.save();
        await user.save();

        return res.json(user.visited_restaurants);
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

// Remove user from visited
// Private
router.post('/:id/removevisit', auth, async (req, res) => {
    const userID = req.user.id;
    const { id } = req.params;

    try {
        const user = await User.findOne({ _id: userID });

        if (!user) {
            return res.status(400).json({
                error: {
                    message: 'User does not exist',
                },
            });
        }

        const restaurant = await Restaurant.findOne({ _id: id });

        if (!restaurant) {
            return res.status(400).json({
                error: {
                    message: 'Restaurant does not exist',
                },
            });
        }

        if (restaurant.visited.filter((usr) => usr.user.toString() === userID).length === 0) {
            return res.status(400).json({
                errors: [
                    {
                        message: 'Not visited yet',
                    },
                ],
            });
        }

        const removeRestaurantIndex = restaurant.visited.map((usr) => usr.user.toString()).indexOf(userID);
        const removeUserIndex = user.visited_restaurants
            .map((rest) => rest.restaurant.toString())
            .indexOf(restaurant._id.toString());

        restaurant.visited.splice(removeRestaurantIndex, 1);
        user.visited_restaurants.splice(removeUserIndex, 1);

        await restaurant.save();
        await user.save();

        return res.json(user.visited_restaurants);
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
