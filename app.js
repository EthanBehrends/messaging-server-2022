require("module-alias/register")

const { initWebsocket } = require("./wsock")

const express = require('express')
const app = express()
const http = require("http")
const cors = require('cors')
const { auth, api } = require('routes')

const PORT = config.server.port

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.method, "->", req.path)
    next()
})
app.use('/auth', auth)
app.use('/app', api)

app.get('/', (req, res) => {
    res.send("Hello World!")
})

module.exports.startApp = () => {
    const server = http.createServer(app)
    initWebsocket(server)

    server.listen(PORT, () => {
        console.log(`Listening at localhost:${PORT}`)
    })

}
