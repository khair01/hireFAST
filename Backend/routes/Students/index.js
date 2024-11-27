import express from 'express';
const router = express.Router();
import { uploadImage } from '../../Controller/filesuploading/index.js';
import { uploadCV } from '../../Controller/Student/index.js';

router.post('/uploadcv', uploadImage.single('cv'), uploadCV);
export default router;
