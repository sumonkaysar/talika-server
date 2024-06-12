require("dotenv").config()

const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS

const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.iemoob8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

module.exports = uri