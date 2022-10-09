const mongoose = require('mongoose')
const AuthUtils = require("utils/AuthUtils")

let schema = require('models/BaseModel').clone()

const modelName = "Channel"
const collection = "channel"

schema.add({
    name:                   {type: String},
    createdBy:              {type: mongoose.Schema.Types.ObjectId, ref: "User"},

    private:                {type: Boolean, default: false},
})

schema.set("collection", collection)
schema.set("modelName", modelName)

schema.set("send-websocket-updates", true)

schema.statics.addRecord = async (data, req) => {
    const model = mongoose.model(modelName)

    console.log(data)

    const record = await model.create(data)

    return record
}


module.exports = mongoose.model(modelName, schema)