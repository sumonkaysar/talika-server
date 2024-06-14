const { ObjectId } = require("mongodb")
const { tasksCollection } = require("../mongoDBConfig/collections")

const getWorkspaceAllTasks = async (req, res) => {
    const { id } = req.params
    const workspaceTasks = await tasksCollection.find({ workspaceId: id }).toArray()
    res.json(workspaceTasks)
}

const createTask = async (req, res) => {
    const task = req.body
    const result = await tasksCollection.insertOne(task)
    res.json(result)
}

const updateTask = async (req, res) => {
    const { id } = req.params
    const updatedData = req.body
    const result = await tasksCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatedData })
    res.json(result)
}

const deleteTask = async (req, res) => {
    const { id } = req.params
    const result = await tasksCollection.deleteOne({ _id: new ObjectId(id) })
    res.json(result)
}

module.exports = {
    getWorkspaceAllTasks,
    createTask,
    updateTask,
    deleteTask,
}