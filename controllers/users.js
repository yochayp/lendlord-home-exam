const Users = require('../lib/users')
const users = new Users()

async function initialize() {
  await users.initialize()
}
initialize()

/**
 * Gets aggregated user data by _id
 */
exports.getUserById = async ctx => {
  const { userId } = ctx.params
  try {
    const user = await users.findUser({ _id: userId })
    if (!user) ctx.throw(404, 'Not Found')
    ctx.status = 200
    ctx.body = user
  } catch (err) {
    log.error(`Failed getUserById on user.js. params: ${JSON.stringify(ctx.params)}, with error: ${err}`)
    ctx.status = err.status
    ctx.message = err.message
  }
}

const isEmailRegistered = async (ctx, email) => {
  if (!email) ctx.throw(409, 'Email is required')
  const emailLower = email.toLowerCase()
  const user = await users.findUser({ email: emailLower })
  if (user) ctx.throw(409, 'This email is already used in the application')
}


exports.signupUser = async ctx => {
  const user = ctx.request.body
  try {
    await isEmailRegistered(ctx, user.email)
    user.email = user.email.toLowerCase()
    const newUser = await users.addUser(user)
    ctx.body = newUser
    ctx.status = 200
  } catch (err) {
    log.error(
      `Failed signupUser on user.js. params: ${JSON.stringify(ctx.params)}, input: ${JSON.stringify(
        ctx.request.body
      )}, with error: ${err}`
    )
    ctx.status = err.status
    ctx.message = err.message
  }
}

