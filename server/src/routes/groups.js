var express = require('express');
const router = express.Router();

import Group from '@app/models/group';

router.get('/', (req, res) => {
    res.send('Group!!');
});

router.post('/', async (req, res) => {

    const group = new Group({
        username: 'chriscooper13'
    });

    await group.save();

    res.json(group);
})

export default router;