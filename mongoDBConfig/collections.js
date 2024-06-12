const client = require("./config")
const DB = client.db("")

const usersCollection = DB.collection("users")

module.exports = {
    usersCollection,
}
