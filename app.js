const express = require("express")
const cors = require("cors")
const client = require("./mongoDBConfig/config")
const routes = require("./routes")

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

async function run() {
    try {
        await client.connect()
        routes(app)

    } finally {
        // await client.close()
    }
}
run().catch(console.dir)

app.get("/", (_, res) => {
    res.send("Server is running...😇😇😇")
});

app.listen(port, () => {
    console.log("Server is running on port:", port)
})