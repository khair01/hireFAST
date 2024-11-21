import { pool } from '../../Database/database.js';

export const addCompany = async (req, res) => {
    try {
        const { company_name, description, website } = req.body;
        const imageUrl = req.file?.location || null;
        console.log(imageUrl);

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
        console.log("Query:", insertQuery);
        console.log("Parameters:", queryParams);

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