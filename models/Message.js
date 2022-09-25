const mongoose = require('mongoose')
const AuthUtils = require("utils/AuthUtils")

let schema = require('models/BaseModel').clone()

const modelName = "Message"
const collection = "message"

schema.add({
    content:                {type: String},
    createdBy:              {type: mongoose.Schema.Types.ObjectId, ref: "User"},

    edited:                {type: Boolean, default: false},
    sentAt:                 {type: Date},
    channel:                {type: mongoose.Schema.Types.ObjectId, ref: "Channel"}
})

schema.set("collection", collection)
schema.set("modelName", modelName)

schema.statics.addRecord = async (data, req) => {
    const model = mongoose.model(modelName)
    console.log(data)

    data.sentAt = new Date()

    const record = await model.create(data)

    return record
}

module.exports = mongoose.model(modelName, schema)