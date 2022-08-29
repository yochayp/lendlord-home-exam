const Router = require('koa-router')
const router = new Router()

const UsersController = require('../controllers/users')
const users = new UsersController;

router.post('/', users.addUser);

router.get("/users", users.findUsers);

router.get("/roles", users.getRoles);

router.get("/managers", users.getManagers);

router.put("/user/:userId", users.updateUser);

router.delete("/user/:userId",users.deleteUser);

router.allowedMethods()
module.exports = router
