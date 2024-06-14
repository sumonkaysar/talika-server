const { saveUser, updateUser, getOneUser, saveProviderUser, getDashboardData } = require("../controllers/usersController")
const verifyUser = require("../middlewares/verifyUsers")

const usersRouter = require("express").Router()

usersRouter.post("/", saveUser)

usersRouter.post("/provider", saveProviderUser)

usersRouter.get("/dashboard/:email",  getDashboardData)

usersRouter.get("/:email", verifyUser, getOneUser)

usersRouter.patch("/:email", verifyUser, updateUser)

module.exports = usersRouter