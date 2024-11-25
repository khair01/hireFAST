import express from 'express';
const router = express.Router();
import { getalljobs, postJobs } from '../../Controller/Jobs/index.js';
router.get('/getalljobs/:companyid', getalljobs);
router.post('/postjob', postJobs);
export default router;