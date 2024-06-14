const tasksRouter = require("./routers/tasksRouter")
const usersRouter = require("./routers/usersRouter")
const workspacesRouter = require("./routers/workspacesRouter")

module.exports = function routes(app) {
    app.use("/users", usersRouter)
    app.use("/workspaces", workspacesRouter)
    app.use("/tasks", tasksRouter)
}
