const pg=require('pg');

const { Pool } = pg;

const db = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: "localhost",
    port: 5432,
    database: "novatec"
});

module.exports = db;