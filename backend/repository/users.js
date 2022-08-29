const usersModel = require('../models/users')

module.exports = class Users {
  
  async create(doc) {
    return usersModel.create(doc)
  }

  async findOne(query, projection = {}) {
    return usersModel.findOne(query).select(projection)
  }

  async find(query, options = {},projection = {}, limit = Number.MAX_SAFE_INTEGER) {
    const res = await usersModel.find(query,projection,options)
    return res
  }

  async count(){
    return usersModel.count();
  }

  async findOneAndRemove(query){
    return usersModel.findOneAndRemove(query);
  }

  async findByIdAndUpdate(query,data,func){
    return usersModel.findByIdAndUpdate(query,data,{new: true},func);
  }

  async deleteOne(query) {
    return usersModel.deleteOne(query)
  }
}
