const usersRouter = require("./routers/usersRouter")

module.exports = function routes(app) {
    app.use("/users", usersRouter)
}
