import express from 'express';
import { uploadImage } from '../../Controller/filesuploading/index.js';
import { addCompany, getOneCompany, updateOneCompany } from '../../Controller/Company/index.js';
import { authMiddleware } from '../../middleware/confirmuser.js'
const router = express.Router();

router.post('/addcompany', uploadImage.single('profilePic'), addCompany)
router.get('/getonecompany/:id', getOneCompany)
router.put('/updateonecompany', uploadImage.single('profilePic'), updateOneCompany);
export default router;

