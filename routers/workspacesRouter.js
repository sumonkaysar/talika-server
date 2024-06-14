const { getUsersAllWorkspaces, createWorkspace, getOneWorkspace } = require("../controllers/workspacesController")
const verifyUser = require("../middlewares/verifyUsers")

const workspacesRouter = require("express").Router()

workspacesRouter.get("/user/:email", verifyUser, getUsersAllWorkspaces)

workspacesRouter.post("/", verifyUser, createWorkspace)

workspacesRouter.get("/:id", verifyUser, getOneWorkspace)


module.exports = workspacesRouter