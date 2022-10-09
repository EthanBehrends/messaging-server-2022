const mongoose = require('mongoose')
const { broadcastAction } = require("wsock")

const schema = new mongoose.Schema({
    deleted:        {type: Boolean, default: false},
    flags:          {type: mongoose.SchemaTypes.Mixed}
})

schema.pre("save", async function(next) {
    console.log(`Saving ${this.constructor.modelName} ${this._id}`)

    if (this.preSave) {
        await this.preSave()
    }

    next()
})

schema.post("save", async function() {
    if (!this.schema.options["send-websocket-updates"]) return

    broadcastAction(`${this.constructor.modelName}_updated`, this.toJSON())
})

module.exports = schema