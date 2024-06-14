const { ObjectId } = require("mongodb")
const { workspacesCollection } = require("../mongoDBConfig/collections")

const getUsersAllWorkspaces = async (req, res) => {
    const { email } = req.params
    const workspaces = await workspacesCollection.find({ creatorEmail: email }).toArray()
    res.json(workspaces)
}

const createWorkspace = async (req, res) => {
    const workspace = req.body
    const result = await workspacesCollection.insertOne(workspace)
    res.json(result)
}

const getOneWorkspace = async (req, res) => {
    const { id } = req.params
    const workspace = await workspacesCollection.findOne({ _id: new ObjectId(id) })
    res.json(workspace)
}

module.exports = {
    getUsersAllWorkspaces,
    createWorkspace,
    getOneWorkspace,
}
