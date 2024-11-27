import { pool } from '../../Database/database.js';
import multer from 'multer';
import dotenv from 'dotenv';


export const uploadCV = async (req, res) => {
    try {
        console.log("aaaaaaaaa");
        const cv = req.file?.location;
        const { company_id, job_id, student_id } = req.body;
        if (!cv || !company_id || !job_id || !student_id) {
            return res.status(404).json({
                message: "required fields are missing",
                success: false
            })
        }
        const insertQuery = `insert into jobapplications (cv,company_id,job_id,student_id) values ($1,$2,$3,$4)`;
        const queryParams = [cv, company_id, job_id, student_id];
        const result = await pool.query(insertQuery, queryParams);

        if (result.rowCount === 0) {
            return res.status(406).json({
                message: "failed to upload jobapplications",
                success: false,
            })
        }
        return res.status(200).json({
            message: "cv uploaded successfully",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
}