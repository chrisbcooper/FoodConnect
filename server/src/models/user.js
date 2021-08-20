import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        bio: {
            type: String,
        },
        posts: [
            {
                post: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Post',
                },
            },
        ],
        following: [
            {
                following_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                block: {
                    type: Boolean,
                },
                following_since: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        followers: [
            {
                follower_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                block: {
                    type: Boolean,
                },
                follower_since: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        groups: [
            {
                group: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Group',
                    required: true,
                },
            },
        ],
        reviews: [
            {
                review: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Review',
                    required: true,
                },
            },
        ],
        wishlist: [
            {
                restaurant: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'restaurant',
                    required: true,
                },
            },
        ],
        liked_restaurants: [
            {
                restaurant: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'restaurant',
                    required: true,
                },
            },
        ],
        visited_restaurants: [
            {
                restaurant: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'restaurant',
                    required: true,
                },
            },
        ],
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
