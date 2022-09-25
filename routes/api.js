const router = require('express').Router()
const { errorRes } = require("utils/APIUtils")

const mongoose = require("mongoose")
const User = require("models/User")
require("models/Channel")
require("models/Message")
const { broadcastAction } = require("wsock")

router.use("/:model", async (req, res, next) => {
    const models = [
        "Channel",
        "Message"
    ]

    if (!models.includes(req.params.model)) {
        errorRes(res, "Invalid model")
        return
    } 

    try {
        const model = mongoose.model(req.params.model)
        req.model = model
        next()
    } catch {
        errorRes(res, "Invalid model")
    }
})

router.get("/:model", async (req, res) => {
    const model = req.model

    let records = await model.find({}).limit(100)

    res.json(records)
})

router.post("/:model/add", async (req, res) => {
    const model = req.model

    let record = await model.addRecord(req.body, req)

    broadcastAction(`${req.params.model}_Added`, record.toJSON())

    res.sendStatus(200)
})
router.post("/:model/update", async (req, res) => {
    const model = req.model

    const recordId = req.body._id

    let record = model.findOneById(recordId)

    record.set(req.body)

    broadcastAction(`${req.params.model}_Updated`, record.toJSON())

    res.sendStatus(200)
})
router.post("/:model/delete", async (req, res) => {
    const model = req.model

    const recordId = req.body._id

    let record = model.findOneById(recordId)

    record.deleted = true

    broadcastAction(`${req.params.model}_Deleted`, record.toJSON())

    res.sendStatus(200)
})

module.exports = router