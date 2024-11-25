import { pool } from '../../Database/database.js';
import multer from 'multer';
import dotenv from 'dotenv';
export const addCompany = async (req, res) => {
    try {
        const { company_name, description, website } = req.body;
        const imageUrl = req.file?.location || req.body.imageUrl || null;
        // console.log(imageUrl);

        if (!company_name || !description) {
            return res.status(400).json({
                message: "Company name or description missing",
            });
        }

        // Validate website URL if provided


        // Construct dynamic query
        let insertQuery, queryParams;

        if (website) {
            insertQuery = `INSERT INTO company (company_name, description, website, imageUrl) VALUES ($1, $2, $3, $4)`;
            queryParams = [company_name, description, website, imageUrl];
        } else {
            insertQuery = `INSERT INTO company (company_name, description, imageUrl) VALUES ($1, $2, $3)`;
            queryParams = [company_name, description, imageUrl];
        }

        // Log query for debugging
        // console.log("Query:", insertQuery);
        // console.log("Parameters:", queryParams);

        // Execute query
        await pool.query(insertQuery, queryParams);

        return res.status(201).json({
            message: "Company added successfully",
        });
    } catch (e) {
        console.error("Error inserting company:", e);
        return res.status(500).json({
            message: "Error adding company",
            error: e.message, // Optional: include error message for debugging
        });
    }
}

export const getOneCompany = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Company ID is required" });
        }


        const SelectQuery = 'SELECT * FROM company WHERE company_id = $1';
        const queryParams = [id];
        const { rows } = await pool.query(SelectQuery, queryParams);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Company not found" });
        }

        return res.status(200).json(rows[0]);
    } catch (e) {
        console.error("Error fetching single company data:", e);
        return res.status(500).json({ message: "Error fetching company data" });
    }
};

export const updateOneCompany = async (req, res) => {
    try {
        const { company_name, description, website, id } = req.body;
        const imageUrl = req.file?.location || req.body.imageUrl || null;
        // console.log(req.body);

        if (!company_name || !description) {
            return res.status(400).json({
                message: "Company name or description missing",
            });
        }

        let selectQuery, selectQueryParams;
        selectQuery = 'select * from company where company_id=$1';
        selectQueryParams = [id];
        let { rows } = await pool.query(selectQuery, selectQueryParams);
        // console.log("rows", rows[0]);
        if (rows.length === 0) {
            return res.status(404).json({
                message: "id not found",
                success: false
            })
        }

        let updateQuery = 'update company set company_name=$1,description=$2,website=$3,imageurl=$4 where company_id=$5  RETURNING *; '
        let updateParams = [company_name, description, website, imageUrl, id]
        const result = await pool.query(updateQuery, updateParams);
        if (result.rowCount === 0) {
            return res.status(400).json({
                message: "error updating company data",
                success: false
            })
        }
        // console.log("rows updated successfully", result.rowCount);
        return res.status(201).json({
            message: "Company updated successfully",
            data: result.rows[0]
        });
    } catch (e) {
        console.error("Error inserting company:", e);
        return res.status(500).json({
            message: "Error adding company",
            error: e.message,
        });
    }
}

export const getcompanybyuserId = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(401).json({
                message: "id is required",
                success: false,
            })
        }
        // if (role && role === 'student') {
        //     return res.status(403).json({
        //         message: "only employers can add company",
        //         success: false,
        //     })
        // }
        let findCompany = 'Select * from company where employer_id=$1';

        const { rows } = await pool.query(findCompany, [id]);
        if (rows.length === 0) {
            return res.status(404).json({
                message: 'employer has no Company registered',
                success: false
            })
        }
        // console.log(rows);
        return res.status(200).json({
            success: true,
            data: rows[0]
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error'
        })
    }


}