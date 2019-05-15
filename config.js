require('dotenv').config();


module.exports = {
    dbHost: process.env.DB_HOST,
    dbUSER: process.env.DB_USER,
    dbPass: process.env.DB_PASSWORD,
    db: "bamazon_DB",
    port: 3306
}