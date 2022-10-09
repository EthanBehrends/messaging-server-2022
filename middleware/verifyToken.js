const AuthUtils = require('utils/AuthUtils')
const mongoose = require("mongoose")

const verifyToken = async (req, res, next) => {
    try {
        let jwt = req.headers["access-token"]

        if (!jwt) throw "No token provided"

        let token = AuthUtils.decodeToken(jwt)

        console.log("Token verified", token)

        const User = mongoose.model("User")

        let user = await User.findById(token)

        if (!user) throw "User no longer exists"

        req.user = user
        
        next()
    } catch (e) {
        res.status(401).send(e)
    }
}

module.exports.verifyToken = verifyToken