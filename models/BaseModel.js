const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
    flags:          {type: mongoose.SchemaTypes.Mixed}
})