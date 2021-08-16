import express from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

import Post from '@app/models/post';

import auth from '@app/middleware';

// Create new post
// Private

router.post('/', auth, async (req, res) => {

    const _id = req.user.id;
    const { caption, image } = req.body;

    try {

        const post = new Post ({
            user: _id,
            caption,
            image,
        });

        await post.save();

        return res.json(post);

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            errors: [
                {
                message: 'Internal Server Error'
                }
            ]
        })
    }
});

// Delete post
// Private

router.delete('/:id', auth, async (req, res) => {

    const userId = req.user.id;
    const { id } = req.params;

    try {

        const post = await Post.findOne({ _id: id });

        if(post.user.toString() !== userId) {
            return res.status(400).json({
                errors: [
                    {
                        'message': 'User not authorized'
                    }
                ]
            });
        }

        await Post.deleteOne({ _id: id });

        return res.json({
            'message': 'SUCCESS'
        });

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            errors: [
                {
                message: 'Internal Server Error'
                }
            ]
        })
    }
});


// Add a like
// Private

router.post('/like/:id', auth, async (req, res) => {
   
    const userID = req.user.id;
    const { id } = req.params;

    try {

        const post = await Post.findById(id);

        if(!post) {
            res.status(400).json({
                errors: [
                    {
                        'message': 'Post does not exist',
                    }
                ]
            })
        }

        if(post.likes.filter((like) => like.user.toString() === userID).length > 0) {
            return res.status(400).json({
                errors: [
                    {
                        'message': 'Post already liked'
                    }
                    
                ]
            })
        }

        post.likes.unshift({ user: userID });
        await post.save();

        return res.json(post.likes);

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            errors: [
                {
                message: 'Internal Server Error'
                }
            ]
        })
    }
});

// Add a like
// Private

router.post('/unlike/:id', auth, async (req, res) => {
   
    const userID = req.user.id;
    const { id } = req.params;

    try {

        const post = await Post.findById(id);

        if(!post) {
            return res.status(400).json({
                errors: [
                    {
                        'message': 'Post does not exist',
                    }
                ]
            })
        }

        if(post.likes.filter((like) => like.user.toString() === userID).length === 0) {
            return res.status(400).json({
                errors: [
                    {
                        'message': 'Post not liked'
                    }
                    
                ]
            })
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
                message: 'Internal Server Error'
                }
            ]
        })
    }
});

// Add a comment
// Private

router.post('/comment/:id', [
    auth,
    body('text', 'Text is required').not().isEmpty(),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   
    const userID = req.user.id;
    const { id } = req.params;
    const { text } = req.body;

    try {

        const post = await Post.findById(id);

        if(!post) {
            return res.status(400).json({
                errors: [
                    {
                        'message': 'Post does not exist',
                    }
                ]
            })
        }

        post.comments.unshift({ 
            user: userID,
            text
         });
        await post.save();

        return res.json(post.comments);

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            errors: [
                {
                message: 'Internal Server Error'
                }
            ]
        })
    }
});

// Delete a comment
// Private

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {

    const userID = req.user.id;
    const { id, comment_id } = req.params;

    try {

        const post = await Post.findById(id);

        if(!post) {
            return res.status(400).json({
                errors: [
                    {
                        'message': 'Post does not exist',
                    }
                ]
            })
        }

        const comment = post.comments.find(
            (comment) => comment._id.toString() === comment_id
        );

        if(!comment) {
            return res.status(400).json({
                errors: [
                    {
                        'message': 'Comment does not exist'
                    }
                ]
            })
        }

        if(comment.user.toString() !== userID) {
            return res.status(400).json({
                errors: [
                    {
                        'message': 'User not authorized'
                    }
                ]
            })
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
                message: 'Internal Server Error'
                }
            ]
        })
    }
});


export default router;