const express = require('express');
const router = express.Router();

import users from './users';
import posts from './posts';

router.use('/users', users);
router.use('/posts', posts);

export default router;