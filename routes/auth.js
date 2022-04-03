const router = require('express').Router()

router.get('/:number', (req, res) => {
    res.send(utils.generateRandomString(parseInt(req.params.number)))
})

router.post('/register', (req, res) => {

})

router.post('/authenticate', (req, res) => {

})

module.exports = router