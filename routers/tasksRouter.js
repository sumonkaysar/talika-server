const { createTask, getWorkspaceAllTasks, deleteTask, updateTask } = require("../controllers/tasksCollection")
const verifyUser = require("../middlewares/verifyUsers")

const tasksRouter = require("express").Router()

tasksRouter.post("/", verifyUser, createTask)

tasksRouter.get("/workspaces/:id", verifyUser, getWorkspaceAllTasks)

tasksRouter.delete("/:id", verifyUser, deleteTask)

tasksRouter.patch("/:id", verifyUser, updateTask)


module.exports = tasksRouter