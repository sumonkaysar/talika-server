const { usersCollection } = require("../mongoDBConfig/collections")

const saveUser = async (req, res) => {
    const user = req.body
    const result = await usersCollection.insertOne(user)
    const token = jwt.sign({ user: { email: user.email } }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' })
    res.json({ result, token })
}

const saveProviderUser = async (req, res) => {
    const user = req.body
    const existedUser = await usersCollection.findOne({ email: user.email })
    const token = jwt.sign({ user: { email: user.email } }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' })
    if (existedUser?.email) {
        return res.json({ token })
    }
    const result = await usersCollection.insertOne(user)
    res.json({ result, token })
}

const getOneUser = async (req, res) => {
    const { email } = req.params
    const user = await usersCollection.findOne({ email })
    res.json(user)
}

const updateUser = async (req, res) => {
    const { email } = req.params
    const updatedInfo = req.body
    const result = await usersCollection.updateOne({ email }, { $set: updatedInfo })
    res.json(result)
}

module.exports = {
    saveUser,
    saveProviderUser,
    getOneUser,
    updateUser,
}
