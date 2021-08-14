import express from 'express';

import { retrieve } from '../controllers/fantasyapiPlayers.js';

const router = express.Router();

router.get('/retrieve', retrieve);

export default router;