var express = require('express');
const router = express.Router();

import getPost from './get';
import postPost from './post';

router.use('', getPost);
router.use('', postPost);

export default router;