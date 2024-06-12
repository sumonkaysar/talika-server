const { getAllUsers } = require("../controllers/usersController")

const usersRouter = require("express").Router()

usersRouter.get("/", getAllUsers)

module.exports = usersRouter
