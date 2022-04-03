const mongoose = require('mongoose')
let schema = require('models/BaseModel').clone()

const modelName = "User"
const collection = "user"

schema.add({
    email:                  {type: String},
    firstName:              {type: String},
    lastName:               {type: String},
    
    auth: {
        hash:               {type: String},
        salt:               {type: String},
    }
})

schema.set("collection", collection)
schema.set("modelName", modelName)

module.exports = mongoose.model(modelName, schema)