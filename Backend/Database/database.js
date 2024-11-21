import pkg from 'pg';
const { Pool } = pkg;
// Set up the PostgreSQL client
const pool = new Pool({
    user: 'postgres.naesihwakfonedbaekjq',               // Supabase database user
    host: 'aws-0-ap-southeast-1.pooler.supabase.com',   // Supabase host
    database: 'postgres',       // Supabase database name
    password: 'hellohaji123!',       // Supabase password
    port: 6543,
    ssl: {
        rejectUnauthorized: false
    }
});

export { pool }

// import { createClient } from '@supabase/supabase-js'
// import dotenv from 'dotenv';
// dotenv.config()

// const supabaseUrl = process.env.SUPABASEURL
// const supabaseKey = process.env.SUPABASEKEY

// const client = createClient(supabaseUrl, supabaseKey)

// console.log("connected to supabase")
// export { client }
