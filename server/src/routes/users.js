var express = require('express');
const router = express.Router();

import User from '@app/models/user';

router.get('/', (req, res) => {
    
    res.send('Users!!');
});

router.post('/', async (req, res) => {

    const user = new User({
        username: 'chriscooper13'
    });

    await user.save();

    res.json(user);
})

export default router;