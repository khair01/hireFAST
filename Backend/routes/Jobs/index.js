import express from 'express';
const router = express.Router();
import { getalljobs } from '../../Controller/Jobs/index.js';
router.get('/getalljobs/:companyid', getalljobs);

export default router;