import pg from 'pg'

const { Client } = pg

export const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "kitkatkut",
    database: "hirefast"
})


