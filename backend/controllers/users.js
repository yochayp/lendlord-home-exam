const Users = require('../lib/users')
const users = new Users()

module.exports = class {

  async addUser (ctx) {
    const {body} = ctx.request;
    try {
      let res = await users.addUser(body);
      ctx.body = res;
    } catch (error) {
      ctx.response.status = 400;
      ctx.message = error.message;
    }
  }

  async updateUser(ctx){
    const {userId} = ctx.params;
    const {body} = ctx.request;
      const res = await users.updateUser(userId,body);
      ctx.body = res;
      return 
  }

  async findUser(input, projection = {}) {
    const result = await users.findUser(input, projection)
    return result
  }

  async getManagers (ctx) {
    try {
      const result = await users.findManagers();
      ctx.body = result;
    } catch (error) {
      ctx.response.status = 400;
      ctx.message = error.message;
    }
  }

  async findUsers(ctx){
    const limit = parseInt(ctx.query.npp);
    const page = parseInt(ctx.query.page);
    try {      
      const res = await  users.findUsers({},{page,limit});
      ctx.body = res;
    } catch (error) {
      ctx.response.status = 400;
      ctx.message = error.message;
    }
    }
  
  async deleteUser (ctx) {
    const id = ctx.params.userId; 
    try {
      const res = await users.deleteUser({ _id: id });
      ctx.body = res;
    } catch (error) {
      ctx.response.status = 400;
      ctx.message = error.message;
    }
  }

  async getRoles(ctx){
    try {
      const result = await users.getRoles();
      ctx.body = result;
    } catch (error) {
      ctx.response.status = 400;
      ctx.message = error.message;
    }
  }
}

async function initialize() {
  await users.initialize()
}
initialize()