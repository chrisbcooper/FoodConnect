import express from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

import { upload } from '../../middleware/upload.js';

import auth from '../../middleware/index.js';
import Group from '../../models/group.js';
import User from '../../models/user.js';
import Post from '../../models/post.js';

// Create a group
// Private

router.post(
    '/',
    [
        auth,
        body('name', 'Name is required').not().isEmpty(),
        body('bio', 'Bio is required').not().isEmpty(),
        upload.single('image'),
    ],
    async (req, res) => {
        const body = Object.assign({}, req.body);

        const errors = validationResult(body);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userId = req.user.id;
        const { name, bio } = body;

        let image;
        if (req.file) {
            image = req.file.location;
        }

        try {
            const user = await User.findOne({ _id: userId });

            if (!user) {
                return res.status(400).json({
                    errors: [
                        {
                            message: 'User does not exist',
                        },
                    ],
                });
            }

            const newGroup = new Group({
                name,
                bio,
                image,
                owner: userId,
                users: [
                    {
                        user: userId,
                    },
                ],
            });

            await newGroup.save();

            user.groups.unshift({ group: newGroup._id });
            await user.save();

            return res.json(newGroup);
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
    }
);

// Follow a group
// Private

router.post('/:id/follow', auth, async (req, res) => {
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

        const group = await Group.findOne({ _id: id });

        if (!group) {
            return res.status(400).json({
                errors: [
                    {
                        message: 'Group does not exist',
                    },
                ],
            });
        }

        if (group.users.filter((user) => user.user.toString() === userID).length > 0) {
            return res.status(400).json({
                errors: [
                    {
                        message: 'Already follow group',
                    },
                ],
            });
        }

        group.users.unshift({ user: userID });
        await group.save();

        user.groups.unshift({ group: group._id });
        await user.save();

        return res.json(group);
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

// Unfollow a group
// Private

router.post('/:id/unfollow', auth, async (req, res) => {
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

        const group = await Group.findOne({ _id: id });

        if (group.users.filter((user) => user.user.toString() === userID).length === 0) {
            return res.status(400).json({
                errors: [
                    {
                        message: 'Group not found',
                    },
                ],
            });
        }

        if (group.owner.toString() === userID) {
            return res.status(400).json({
                errors: [
                    {
                        message: 'Cannot unfollow if owner',
                    },
                ],
            });
        }

        const removeUserIndex = group.users.map((user) => user.user.toString()).indexOf(userID);
        group.users.splice(removeUserIndex, 1);

        const removeGroupindex = user.groups.map((group) => group.group.toString()).indexOf(group._id);
        user.groups.splice(removeGroupindex, 1);

        await group.save();
        await user.save();

        return res.json(group);
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

// Delete Group
// Private

router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;
    const userID = req.user.id;

    try {
        const group = await Group.findOne({ _id: id.toString() });

        if (!group) {
            return res.status(400).json({
                errors: [
                    {
                        message: 'Group does not exist',
                    },
                ],
            });
        }

        if (group.owner.toString() !== userID) {
            return res.status(400).json({
                errors: [
                    {
                        message: 'Cannot delete if not owner',
                    },
                ],
            });
        }

        const users = group.users.map((user) => user.user.toString());

        await User.updateMany(
            {
                _id: users,
            },
            {
                $pull: {
                    groups: {
                        group: group._id.toString(),
                    },
                },
            }
        );

        await Post.deleteMany({
            group: group._id.toString(),
        });

        await Group.deleteOne({ _id: id });

        return res.json({
            message: 'SUCCESS',
        });
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
