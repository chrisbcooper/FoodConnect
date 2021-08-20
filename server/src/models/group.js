import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        bio: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'user',
        },
        users: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                join_date: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        posts: [
            {
                post: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Post',
                },
            },
        ],
    },
    { timestamps: true }
);

const Group = mongoose.model('Group', groupSchema);

export default Group;
