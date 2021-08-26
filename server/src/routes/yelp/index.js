import express from 'express';

const router = express.Router();

import yelpGet from './get.js';

router.use('', yelpGet);

export default router;
