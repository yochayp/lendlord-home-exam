const { identity } = require('lodash');
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
      const result = await users.findUsers({userType:"Manager"});
      ctx.body = result;
    } catch (error) {
      ctx.response.status = 400;
      ctx.message = error.message;
    }
  }

  async findUsers(ctx){
    const limit = parseInt(ctx.query.npp);
    const page = parseInt(ctx.query.page);

    const skip = limit*page;
    const usersCollection = await  users.findUsers({},{skip:skip,limit:limit},{});
    const totalUsers = await users.count();

    const totalPages = Math.ceil(totalUsers / limit);
    const currentPage = Math.ceil(totalUsers % page);

    ctx.body = {
      data: usersCollection,
      paging: {
        total: totalUsers,
        page: currentPage,
        pages: totalPages,
      },
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