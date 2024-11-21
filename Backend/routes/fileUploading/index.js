import express from 'express';
import { uploadImage, imageUploadControllerWeb } from '../../Controller/filesuploading/index.js'
const router = express.Router();


router.post("/image-upload", uploadImage.single('image'), imageUploadControllerWeb)
export default router;