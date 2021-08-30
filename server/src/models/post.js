import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        caption: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        group: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group',
        },
        likes: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
            },
        ],
        comments: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                text: {
                    type: String,
                },
                date: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
