import express from 'express';
import { uploadImage } from '../../Controller/filesuploading/index.js';
import { addCompany } from '../../Controller/Company/index.js';
const router = express.Router();

router.post('/addcompany', uploadImage.single('profilePic'), addCompany)

export default router;

