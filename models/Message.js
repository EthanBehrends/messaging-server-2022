const mongoose = require('mongoose')
const AuthUtils = require("utils/AuthUtils")

let schema = require('models/BaseModel').clone()

const modelName = "Message"
const collection = "message"

schema.add({
    content:                {type: String},
    createdBy:              {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    userDisplay:            {type: String},
    
    edited:                 {type: Boolean, default: false},
    sentAt:                 {type: Date},
    channel:                {type: mongoose.Schema.Types.ObjectId, ref: "Channel"},
    userGroup:              [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
})

schema.set("collection", collection)
schema.set("modelName", modelName)

schema.set("send-websocket-updates", true)

schema.statics.addRecord = async (data, req) => {
    const model = mongoose.model(modelName)

    data.sentAt = new Date()

    const record = await model.create(data)

    return record
}

schema.methods.preSave = async function() {
    await generateUserDisplay.call(this)

    if (!this.isNew && this.modifiedPaths().includes("content")) this.edited = true
}

const generateUserDisplay = async function () {
    const User = mongoose.model("User")

    if (this.userDisplay) return

    if (!(this.createdBy instanceof User)) {
        this.createdBy = await User.findById(this.createdBy)
    }

    if (!this.createdBy) return

    this.userDisplay = `${this.createdBy.firstName} ${this.createdBy.lastName}`
}

module.exports = mongoose.model(modelName, schema)