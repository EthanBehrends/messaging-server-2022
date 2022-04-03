const mongoose = require("mongoose")

const buildURI = (config) => {
    let {uri, username, password, host, port, dbName, options} = config

    if (uri) return uri

    options = Object.entries(options).map(([key, val]) => `${key}=${val}`).join("&")

    uri = "mongodb://"

    if (username && password) uri += `${username}:${password}@`
    if (!host) throw "No MongoDB hostname specified"
    uri += host
    if (port) uri += `:${port}`
    if (!dbName) throw "No database specified"
    uri += `/${dbName}`
    if (options) uri += `?${options}`

    return uri
}

//TODO add error handler
const connect = async (mongoConfig = config.database) => {
    if (!mongoConfig.enabled) return
    
    let uri = buildURI(mongoConfig)
    console.log(`MongoDB | Establishing conncection to ${uri}`)
    
    await mongoose.connect(uri, config.mongoose.options)
    console.log("MongoDB | Connected")
}

const disconnect = mongoose.disconnect

module.exports = {
    connect,
    disconnect
}