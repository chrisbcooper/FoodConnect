import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema(
    {
        yelp_id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        photos: [],
        wishlist: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'User',
                },
            },
        ],
        visited: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'User',
                },
            },
        ],
        likes: [
            {
                like: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'User',
                },
            },
        ],
        reviews: [
            {
                review: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Review',
                },
            },
        ],
    },
    { timestamps: true }
);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
