const router = require('express').Router()
const { errorRes } = require("utils/APIUtils")

const User = require("models/User")

router.get('/:number', (req, res) => {
    res.send(utils.generateRandomString(parseInt(req.params.number)))
})

router.post('/register',  async (req, res) => {
    try {
        let { username, password, firstName, lastName, options } = req.body
    
        let { token, user } = await User.registerUser(username, password, firstName, lastName, options)

        res.json({ token, user: user.toClient() })
    } catch (e) {
        console.log(e)
        errorRes(res, e)
    }
})

router.post('/login', async (req, res) => {
    try {
        let { username, password, staySignedIn } = req.body
    
        let { token, user } = await User.login(username, password, staySignedIn)

        res.json({ token, user: user.toClient() })
    } catch (e) {
        console.log(e)
        errorRes(res, e)
    }
})

router.post('/authenticate', async (req, res) => {
    try {
        let { token } = req.body

        let { user } = await User.fromToken(token)
    
        res.json({ user: user.toClient() })
    } catch (e) {
        console.log(e)
        errorRes(res, e)
    }
})

module.exports = router