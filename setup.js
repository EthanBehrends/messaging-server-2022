const { db, redis } = require('./core')
require('dotenv').config()


module.exports = async () => {
    console.log("-----Server is starting up-----")
    setGlobals()
    setPrototypes()
    await Promise.all([
        connectToDatabase(),
        connectToRedis()
    ])
}

const setGlobals = () => {
    global.config = require('config')
    global._ = require('lodash')
    global.utils = require('./utils/GlobalUtils')
    global.env = process.env
}

const setPrototypes = () => {

}

const connectToDatabase = db.connect

const connectToRedis = redis.connect