import express from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

import Post from '@app/models/post';
import Group from '@app/models/group';

import { upload } from '@app/middleware/upload';

import auth from '@app/middleware';

// Create new post
// Private

router.post(
    '/',
    [auth, body('caption', 'Caption is required').not().isEmpty(), upload.single('image')],
    async (req, res) => {
        const body = Object.assign({}, req.body);

        const errors = validationResult(body);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let image;
        if (req.file) {
            image = req.file.location;
        } else {
            return res.status(400).json({
                errors: [
                    {
                        message: 'Image is required',
                    },
                ],
            });
        }

        const userID = req.user.id;
        const { caption, group } = body;

        console.log(userID);

        try {
            if (group) {
                const postGroup = await Group.findOne({ _id: group });
                if (!postGroup) {
                    res.status(400).json({
                        errors: [
                            {
                                message: 'Group does not exist',
                            },
                        ],
                    });
                }

                if (postGroup.users.filter((user) => user.user.toString() === userID).length === 0) {
                    return res.status(400).json({
                        errors: [
                            {
                                message: 'Cannot post if not in group',
                            },
                        ],
                    });
                }
            }

            const post = new Post({
                user: userID,
                caption,
                image,
                group,
            });

            await post.save();

            return res.json(post);
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

// Delete post
// Private

router.delete('/:id', auth, async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;

    try {
        const post = await Post.findOne({ _id: id });

        if (post.user.toString() !== userId) {
            return res.status(400).json({
                errors: [
                    {
                        message: 'User not authorized',
                    },
                ],
            });
        }

        await Post.deleteOne({ _id: id });

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

// Add a like
// Private

router.post('/:id/like', auth, async (req, res) => {
    const userID = req.user.id;
    const { id } = req.params;

    try {
        const post = await Post.findById(id);

        if (!post) {
            res.status(400).json({
                errors: [
                    {
                        message: 'Post does not exist',
                    },
                ],
            });
        }

        if (post.group) {
            const postGroup = await Group.findOne({ _id: post.group });
            if (!postGroup) {
                res.status(400).json({
                    errors: [
                        {
                            message: 'Group does not exist',
                        },
                    ],
                });
            }

            if (postGroup.users.filter((user) => user.user.toString() === userID).length === 0) {
                return res.status(400).json({
                    errors: [
                        {
                            message: 'Cannot like if not in group',
                        },
                    ],
                });
            }
        }

        if (post.likes.filter((like) => like.user.toString() === userID).length > 0) {
            return res.status(400).json({
                errors: [
                    {
                        message: 'Post already liked',
                    },
                ],
            });
        }

        post.likes.unshift({ user: userID });
        await post.save();

        return res.json(post.likes);
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

// Unlike a post
// Private

router.post('/:id/unlike', auth, async (req, res) => {
    const userID = req.user.id;
    const { id } = req.params;

    try {
        const post = await Post.findById(id);

        if (!post) {
            return res.status(400).json({
                errors: [
                    {
                        message: 'Post does not exist',
                    },
                ],
            });
        }

        if (post.likes.filter((like) => like.user.toString() === userID).length === 0) {
            return res.status(400).json({
                errors: [
                    {
                        message: 'Post not liked',
                    },
                ],
            });
        }

        //Get remove index
        const removeIndex = post.likes.map((like) => like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);
        await post.save();

        return res.json(post.likes);
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

// Add a comment
// Private

router.post('/:id/comment', [auth, body('text', 'Text is required').not().isEmpty()], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const userID = req.user.id;
    const { id } = req.params;
    const { text } = req.body;

    try {
        const post = await Post.findById(id);

        if (!post) {
            return res.status(400).json({
                errors: [
                    {
                        message: 'Post does not exist',
                    },
                ],
            });
        }

        if (post.group) {
            const postGroup = await Group.findOne({ _id: post.group });
            if (!postGroup) {
                res.status(400).json({
                    errors: [
                        {
                            message: 'Group does not exist',
                        },
                    ],
                });
            }

            if (postGroup.users.filter((user) => user.user.toString() === userID).length === 0) {
                return res.status(400).json({
                    errors: [
                        {
                            message: 'Cannot comment if not in group',
                        },
                    ],
                });
            }
        }

        post.comments.unshift({
            user: userID,
            text,
        });
        await post.save();

        return res.json(post.comments);
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

// Delete a comment
// Private

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    const userID = req.user.id;
    const { id, comment_id } = req.params;

    try {
        const post = await Post.findById(id);

        if (!post) {
            return res.status(400).json({
                errors: [
                    {
                        message: 'Post does not exist',
                    },
                ],
            });
        }

        const comment = post.comments.find((comment) => comment._id.toString() === comment_id);

        if (!comment) {
            return res.status(400).json({
                errors: [
                    {
                        message: 'Comment does not exist',
                    },
                ],
            });
        }

        if (comment.user.toString() !== userID) {
            return res.status(400).json({
                errors: [
                    {
                        message: 'User not authorized',
                    },
                ],
            });
        }

        const remove = post.comments.map((comment) => comment._id).indexOf(comment_id);
        post.comments.splice(remove, 1);
        await post.save();

        return res.json(post.comments);
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
