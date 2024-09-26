import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://naesihwakfonedbaekjq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hZXNpaHdha2ZvbmVkYmFla2pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjczMDE1MzgsImV4cCI6MjA0Mjg3NzUzOH0.rXVRyn4ELmyGeeUUFReyHBn8xIL3AI4e9LdckNdaGZ4'
const client = createClient(supabaseUrl, supabaseKey)

console.log("connected to supabase")
export { client }
