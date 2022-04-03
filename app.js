
const app = require('express')()
const cors = require('cors')
const { auth } = require('routes')

const PORT = config.server.port

app.use(cors())

app.use((req, res, next) => {
    console.log(req.method, "->", req.path)
    next()
})
app.use('/auth', auth)

app.get('/', (req, res) => {
    res.send("Hello World!")
})

module.exports.startApp = () => {
    app.listen(PORT, () => {
        console.log(`Listening at localhost:${PORT}`)
    })
}
