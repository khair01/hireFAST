import { pool } from '../../Database/database.js';
import multer from 'multer';
import dotenv from 'dotenv';

export const getalljobs = async (req, res) => {
    try {
        const { companyid } = req.params;
        console.log("hellooo");
        if (!companyid) {
            return res.status(401).json({
                success: false,
                message: "companyid is required"
            })
        }
        const selectQuery = 'Select * from jobs where company_id=$1';
        const { rows } = await pool.query(selectQuery, [companyid]);
        if (rows.length === 0) {
            return res.status(406).json({
                success: false,
                message: 'no jobs found for this company'
            })
        }
        return res.status(200).json({
            data: rows,
            success: true,
        })
    } catch (err) {
        return res.status(500).json({
            message: "internal server error"
        })
    }
}

export const postJobs = async (req, res) => {
    try {

        const data = req.body;
        if (!data.company_id || !data.title || !data.description || !data.requirement || !data.jobtype || !data.closing_date || !data.status) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }
        console.log(data);
        let insertQuery = 'Insert into jobs (company_id,title,description,requirement,jobtype,closing_date,status) values ($1,$2,$3,$4,$5,$6,$7) returning *'
        let QueryParams = [data.company_id, data.title, data.description, data.requirement, data.jobtype, data.closing_date, data.status];
        const { rows } = await pool.query(insertQuery, QueryParams);
        if (rows.length === 0) {
            return res.status(401).json({
                message: "error posting jobs",
                success: false
            })
        }
        return res.status(200).json({
            message: "jobs posted successfully",
            success: true
        })

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            message: "error posting job",
            success: false
        })
    }
}