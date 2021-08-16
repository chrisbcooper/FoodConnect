var express = require('express');
const router = express.Router();

import Post from '@app/models/post';

router.get('/', (req, res) => {
    res.send('Posts!!');
});

router.post('/', async (req, res) => {

    const post = new Post({
        username: 'chriscooper13'
    });

    await post.save();

    res.json(post);
})

export default router;