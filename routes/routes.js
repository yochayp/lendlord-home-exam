const Router = require('koa-router')
const router = new Router()
const usersCtrl = require('../controllers/users')

router.get('/getUserById/:userId', usersCtrl.getUserById)
router.post('/signupUser', usersCtrl.signupUser)

router.allowedMethods()
module.exports = router
