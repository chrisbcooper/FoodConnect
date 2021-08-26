import express from 'express';

const router = express.Router();

import getUser from './get.js';
import postUser from './post.js';
import patchUser from './patch.js';

router.use('', getUser);
router.use('', postUser);
router.use('', patchUser);

export default router;
