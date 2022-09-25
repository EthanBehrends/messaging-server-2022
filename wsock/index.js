const { Server } = require("socket.io")

let io
const ioOptions = {
    cors: {
        origin: "*"
    }
}

const socketHandler = socket => {
    console.log("Wsock Connected")
}

const initWebsocket = httpServer => {
    io = new Server(httpServer, ioOptions)

    console.log("Initing websocket")
    io.on("connection", socketHandler)
}

const broadcastAction = (action, data) => {
    io.emit("action", {action, data})
}

module.exports = {
    initWebsocket,
    broadcastAction
}