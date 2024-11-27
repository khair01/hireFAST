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

export const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('BEGIN');
        await pool.query('SAVEPOINT SP');
        const checkQuery = 'SELECT * FROM jobs WHERE job_id = $1';
        const checkResult = await pool.query(checkQuery, [id]);
        if (checkResult.rows.length === 0) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }
        await pool.query('SAVEPOINT SP1');
        const deleteQuery = 'DELETE FROM jobs WHERE job_id = $1';
        const deleteResult = await pool.query(deleteQuery, [id]);

        if (deleteResult.rowCount === 0) {
            await pool.query('ROLLBACK TO SP1');
            return res.status(500).json({
                message: "Failed to delete job",
                success: false
            });
        }
        await pool.query('COMMIT');
        return res.status(200).json({
            message: "Job deleted successfully",
            success: true
        });

    } catch (error) {
        console.error("Error deleting job:", error);
        await pool.query('ROLLBACK TO SP');
        return res.status(500).json({
            message: "Error deleting job",
            success: false
        });
    }
};


export const getallCompaniesJobs = async (req, res) => {
    try {
        // Query to fetch all jobs and their company names
        const selectQuery = `
            SELECT j.*, c.company_name
            FROM jobs j
            JOIN company c 
            ON j.company_id = c.company_id
        `;
        const { rows } = await pool.query(selectQuery);

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No jobs found",
            });
        }

        // Add applicant count and students to each job
        const AddingtoRows = await Promise.all(
            rows.map(async (row) => {
                const jobDetailsQuery = `
                    SELECT 
                        COUNT(*) AS applicant_count,
                        ARRAY_AGG(student_id) AS students
                    FROM jobapplications
                    WHERE job_id = $1;
                `;
                const jobParams = [row.job_id];
                const { rows: jobDetailsRows } = await pool.query(jobDetailsQuery, jobParams);

                const { applicant_count, students } = jobDetailsRows[0];
                return {
                    ...row,
                    applicant_count: applicant_count || 0,
                    students: students || [],
                };
            })
        );

        return res.status(200).json({
            success: true,
            data: AddingtoRows,
        });
    } catch (err) {
        console.error("Error fetching jobs:", err.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};