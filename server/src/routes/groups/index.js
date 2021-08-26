import express from 'express';
const router = express.Router();

import getGroup from './get.js';
import postGroup from './post.js';

router.use('', getGroup);
router.use('', postGroup);

export default router;
