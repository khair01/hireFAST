import express from 'express';
const router = express.Router();
import { getalljobs, postJobs, deleteJob, getallCompaniesJobs } from '../../Controller/Jobs/index.js';
router.get('/getalljobs/:companyid', getalljobs);
router.get('/getallcompaniesjobs', getallCompaniesJobs);
router.post('/postjob', postJobs);
router.delete('/deletejob/:id', deleteJob);
export default router;