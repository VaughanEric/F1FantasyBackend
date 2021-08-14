import express from 'express';

import { retrieve, update } from '../controllers/mongodbPlayers.js';

const router = express.Router();

router.post('/update', update);

router.post('/retrieve', retrieve);

export default router;