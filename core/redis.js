const { createClient } = require('redis')

const buildURI = (config) => {
    let { uri, ssl, username, password, host, port, dbNumber } = config

    if (uri) return uri

    uri = ssl ? 'rediss://' : 'redis://'

    if (username && password) uri += `${username}:${password}@`

    if (!host) throw "No redis host specified"
    uri += host

    if (port) uri += `:${port}`
    if (dbNumber) uri += `/${dbNumber}`

    return uri
}

let client
const connect = async (redisConfig = config.redis) => {
    if (!redisConfig.enabled) return
    let url = buildURI(redisConfig)
    console.log(`Redis | Establishing conncection to ${url}`)
    client = createClient({
        url
    })

    client.on('error', (err) => console.log('Redis Error: ', err))

    await client.connect()
    console.log("Redis | Connected")
}

module.exports = {
    connect,
    client
}