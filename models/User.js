const mongoose = require('mongoose')
const AuthUtils = require("utils/AuthUtils")

let schema = require('models/BaseModel').clone()

const modelName = "User"
const collection = "user"

schema.add({
    username:               {type: String},
    email:                  {type: String},
    firstName:              {type: String},
    lastName:               {type: String},

    auth: {
        hash:               {type: String},
        salt:               {type: String},
    }
})

schema.set("collection", collection)
schema.set("modelName", modelName)

schema.methods.setPassword = function(password) {

}

schema.methods.generateToken = function(timeToLive = 30 * 60 * 1000) {
    let tokenCreatedAt = new Date()

    let tokenData = {
        _id: this._id,
        username: this.username,
        tokenCreatedAt,
        tokenExpireAt: tokenCreatedAt + timeToLive
    }

    let token = AuthUtils.generateToken(tokenData)

    return token
}

schema.methods.toClient = function () {
    const fields = [
        "username",
        "email",
        "firstName",
        "lastName",
        "_id"
    ]

    const data = {}

    fields.forEach(field => data[field] = this[field])

    return data
}

schema.statics.registerUser = async function(username, password, firstName, lastName, options) {
    const User = mongoose.model(modelName)
    let existingUser = await User.findOne({username})
    console.log(existingUser)

    if (existingUser) throw "Username is taken"

    const [hash, salt] = AuthUtils.generateHash(password)

    let user = new User({
        username,
        firstName, 
        lastName,
        auth: {
            hash,
            salt
        }
    })

    await user.save()

    const token = user.generateToken()

    return { token, user }
}

schema.statics.login = async function (username, password) {
    const User = mongoose.model(modelName)
    const ERROR_MSG = "Username or password is incorrect"

    const user = await User.findOne({username})

    if (!user) throw ERROR_MSG

    const { hash, salt } = user.auth
    const isValid = AuthUtils.validateHash(password, hash, salt)

    if (!isValid) throw ERROR_MSG

    const token = user.generateToken()
    
    return { token, user }
}

schema.statics.fromToken = async function (token) {
    const User = mongoose.model(modelName)

    try {
        const tokenContent = AuthUtils.decodeToken(token)
        const user = await User.findOne({ _id: tokenContent._id})
    
        if (!user) throw "User not found"
        
        return { user }
    } catch {
        throw "Token is invalid"
    }
}

module.exports = mongoose.model(modelName, schema)