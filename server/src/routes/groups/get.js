import express from 'express';

const router = express.Router();

import auth from '@app/middleware';

import Group from '@app/models/group';
import User from '@app/models/user';
import Post from '@app/models/post';

// Get all groups
// Public

router.get('/', async (req, res) => {
    try {
        const groups = await Group.find();
        return res.json(groups);
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

// Get current user groups
// Private

router.get('/me', auth, async (req, res) => {
    const userId = req.user.id;

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

        const userGroups = user.groups;
        const groupsFind = [];

        userGroups.forEach((group) => {
            groupsFind.push(group.group.toString());
        });

        const groups = await Group.find({
            _id: groupsFind,
        });

        return res.send(groups);
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

// Get specific group
// Public

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
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

// Get group posts
// Private

router.get('/:id/posts', auth, async (req, res) => {
    const { id } = req.params;
    const userID = req.user.id;

    try {
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

        if (group.users.filter((user) => user.user.toString() === userID).length === 0) {
            return res.status(400).json({
                errors: [
                    {
                        message: 'Cannot view posts if not in group',
                    },
                ],
            });
        }

        const posts = await Post.find({
            group: id,
        });

        res.json(posts);
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
