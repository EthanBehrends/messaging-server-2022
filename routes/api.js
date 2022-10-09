const router = require('express').Router()
const { errorRes } = require("utils/APIUtils")

const mongoose = require("mongoose")
const User = require("models/User")
require("models/Channel")
require("models/Message")

const { verifyToken } = require("middleware/verifyToken")
const { broadcastAction } = require("wsock")

router.use(verifyToken)

router.get("/user", async (req, res) => {
    const User = mongoose.model("User")

    const users = await User.find({})
})

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

    let data = req.body
    data.createdBy = req.user

    let record = await model.addRecord(req.body, req)

    res.sendStatus(200)
})
router.post("/:model/update", async (req, res) => {
    const model = req.model

    const recordId = req.body._id

    let record = await model.findById(recordId)

    record.set(req.body)

    await record.save()

    res.sendStatus(200)
})
router.post("/:model/delete", async (req, res) => {
    const model = req.model

    const recordId = req.body._id

    let record = await model.findById(recordId)

    record.deleted = true

    await record.save()

    res.sendStatus(200)
})

module.exports = router