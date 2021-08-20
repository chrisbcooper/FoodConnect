import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        restaurant_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant',
            required: true,
        },
        stars: {
            type: Number,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        likes: [
            {
                like: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'user',
                    required: true,
                },
            },
        ],
    },
    { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;
