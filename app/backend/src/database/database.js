require("dotenv").config({ path: "../../env" });
const pgp = require("pg-promise")({});
const USER = process.env.DB_USER;
const PASS = process.env.DB_PASS;
const PORT = process.env.DB_PORT;
const NAME = process.env.DB_NAME;
const db = pgp(`postgres://${USER}:${PASS}@localhost:${PORT}/${NAME}`);

module.exports = {db};