import pg from 'pg'

const { Client } = pg

export const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "umar123",
    database: "hirefast"
})


