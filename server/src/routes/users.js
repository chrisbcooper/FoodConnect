import express from 'express';
import bcrypt from 'bcrypt';

const router = express.Router();

import User from '@app/models/user';

router.get('/', (req, res) => {
    
    res.send('Users!!');
});

router.post('/', async (req, res) => {

    const user = new User({
        username: 'chriscooper13'
    });

    const password = 'password';

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const isSame =  await bcrypt.compare(password, hash);
    console.log(isSame)

    // await user.save();

    res.json({
        'message': 'hello'
    });
})

export default router;