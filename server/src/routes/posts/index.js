import express from 'express';
const router = express.Router();

import getPost from './get.js';
import postPost from './post.js';

router.use('', getPost);
router.use('', postPost);

export default router;
