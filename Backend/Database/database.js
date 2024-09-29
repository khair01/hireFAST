import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';
dotenv.config()

const supabaseUrl = process.env.SUPABASEURL
const supabaseKey = process.env.SUPABASEKEY

const client = createClient(supabaseUrl, supabaseKey)

console.log("connected to supabase")
export { client }
