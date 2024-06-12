const jwt = require("jsonwebtoken")


function verifyUser(req, res, next) {
    return next();
    const { authorization: authHeader } = req.headers
    if (!authHeader) {
        return res.status(401).send({ status: 401, message: 'Unauthorized access' })
    }
    if (authHeader.split(" ")[0] === "Bearer") {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
            if (err) {
                return res.status(401).send({ status: 401, message: err.message })
            }
            req.decoded = decoded
            next()
        })
    } else {
        return res.status(401).send({ status: 401, message: 'Unauthorized access' })
    }
}

module.exports = verifyUser