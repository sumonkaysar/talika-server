const jwt = require("jsonwebtoken")
const { usersCollection, workspacesCollection, tasksCollection } = require("../mongoDBConfig/collections")

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

const getDashboardData = async (req, res) => {
    const { email } = req.params
    const totalWorkspaces = await workspacesCollection.find({ creatorEmail: email }).toArray()
    const totalTasks = await tasksCollection.find({ creatorEmail: email }).toArray()
    const highPriorityTasks = await tasksCollection.find({ creatorEmail: email, priority: "High" }).toArray()

    const tasks = await tasksCollection.aggregate([
        {
            $project: {
                createdTime: 1,
                _id: 0
            }
        }
    ]).toArray()
    const yearlyTasks = {};
    tasks.forEach(task => {
        const createdTime = new Date(task.createdTime);
        const year = createdTime.getFullYear();
        if (!yearlyTasks[year]) {
            yearlyTasks[year] = {};
        }
        const month = createdTime.getMonth() + 1;
        if (!yearlyTasks[year][month]) {
            yearlyTasks[year][month] = 0;
        }
        yearlyTasks[year][month] += 1;
    });
    for (const year in yearlyTasks) {
        for (let month = 1; month <= 12; month++) {
            if (!yearlyTasks[year][month]) {
                yearlyTasks[year][month] = 0;
            }
        }
    }

    res.json({
        totalWorkspaces: totalWorkspaces.length,
        totalTasks: totalTasks.length,
        highPriorityTasks: highPriorityTasks.length,
        yearlyTasks,
    })
}

module.exports = {
    saveUser,
    saveProviderUser,
    getOneUser,
    updateUser,
    getDashboardData,
}
