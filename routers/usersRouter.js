const { saveUser, updateUser, getOneUser, saveProviderUser } = require("../controllers/usersController")
const verifyUser = require("../middlewares/verifyUsers")

const usersRouter = require("express").Router()

usersRouter.post("/", saveUser)

usersRouter.post("/provider", saveProviderUser)

usersRouter.get("/:email", verifyUser, getOneUser)

usersRouter.patch("/:email", verifyUser, updateUser)

module.exports = usersRouter