const client = require("./config")
const DB = client.db("talika")

const usersCollection = DB.collection("users")
const workspacesCollection = DB.collection("workspaces")
const tasksCollection = DB.collection("tasks")

module.exports = {
    usersCollection,
    workspacesCollection,
    tasksCollection,
}
