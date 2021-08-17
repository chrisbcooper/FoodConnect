import express from 'express';

const router = express.Router();

import yelpGet from './get';

router.use('', yelpGet);

export default router;