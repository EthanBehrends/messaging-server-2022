module.exports.errorRes = function (res, error) {
    if (typeof error == "string") {
        res.status(400).json({userMessage: error})
    } else {
        res.status(400).json({error: "Unexpected Error"})
    }
}