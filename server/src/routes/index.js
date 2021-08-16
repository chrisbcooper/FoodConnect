const express = require('express');
const router = express.Router();

import users from './users';
import posts from './posts';
import groups from './groups';
import auth from './auth';

router.use('/users', users);
router.use('/posts', posts);
router.use('/groups', groups);
router.use('/auth', auth);

export default router;