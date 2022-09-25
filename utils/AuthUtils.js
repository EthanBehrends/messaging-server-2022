const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const JWT_SECRET = env.JWT_SECRET

const generateHash = (pass) => {
    let salt = crypto.randomBytes(16).toString('hex')
    let hash = crypto.pbkdf2Sync(pass, salt, 1000, 64, `sha512`).toString(`hex`)

    return [hash, salt]
}

const validateHash = (pass, hash, salt) => {
    return hash == crypto.pbkdf2Sync(pass, salt, 1000, 64, `sha512`).toString(`hex`)
}

const generateToken = (data) => {
    return jwt.sign(data, JWT_SECRET)
}

const decodeToken = (token) => {
    let decoded = jwt.verify(token, JWT_SECRET)

    if (!decoded) throw "Token invalid"

    return decoded
}

module.exports = {
    generateHash,
    validateHash,
    generateToken,
    decodeToken
}