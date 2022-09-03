const UserRepo = require('../repository/users')

const users = require('../constants/users');
const roles = Object.values(users.USER_ROLES);

module.exports = class {

  async initialize() {
    this.userRepo = new UserRepo()
  }

  async addUser(data) {
    const userCreated = await this.userRepo.create(data);

    const {_id,firstName,lastName,manager} = userCreated;
    const updatedUsers = [];
    if(manager != ''){
      const updatedUser =  await this.userRepo.findByIdAndUpdate(
        manager._id ,
        { $push : { employees : {_id: _id, firstName: firstName, lastName: lastName}}}
        )
      updatedUsers.push(updatedUser);
    }
    return { userCreated: userCreated, updatedUsers: updatedUsers };
  }

  async updateUser(query, data) {
    let prevUser;
    const updatedUsers = [];
    const userUpdated = await this.userRepo.findByIdAndUpdate(query, data,(err,docs)=>{
      prevUser = docs;
    });

    updatedUsers.push(userUpdated);
    if(prevUser.firstName !== userUpdated.firstName || prevUser.lastName !== userUpdated.lastName){
      if(prevUser.userType === "Manager") {
        for (const employee of userUpdated.employees) {
          const updatedUser = await this.userRepo.findByIdAndUpdate(
            employee._id ,
            { "manager": {"_id":userUpdated._id,"firstName":userUpdated.firstName,"lastName":userUpdated.lastName} } 
            )
            if(updatedUser)updatedUsers.push(updatedUser);
        }
      }else{
        await this.userRepo.findByIdAndUpdate(
          userUpdated.manager._id,
          { $pull: { employees: {_id: userUpdated._id}}}
          )
        const updatedUser = await this.userRepo.findByIdAndUpdate(
          userUpdated.manager._id,
          { $push: { employees: {_id: userUpdated._id, firstName: userUpdated.firstName, lastName: userUpdated.lastName} } }
        )
        if(updatedUser) updatedUsers.push(updatedUser);
      }
    }
    if(prevUser.manager?._id !== userUpdated.manager?._id){
      let updatedUser = await this.userRepo.findByIdAndUpdate(
        prevUser.manager._id, 
        {$pull: {employees: {_id: userUpdated._id}}}
        )
        if(updatedUser) updatedUsers.push(updatedUser);
        updatedUser = await this.userRepo.findByIdAndUpdate(
          userUpdated.manager._id ,
        { $push: { employees: {_id: userUpdated._id, firstName: userUpdated.firstName, lastName: userUpdated.lastName} } }
      )
    
      if(updatedUser) updatedUsers.push(updatedUser);

    }
    
  return { updatedUsers: updatedUsers };
  }

  async findUser(input, projection) {
    const result = await this.userRepo.findOne(input, projection)
    return result
  }

  async findUsers(query,options) {
    const { page,limit } = options;

    const skip = limit*page;
    const usersCollection = await this.userRepo.find(query,{skip:skip,limit:limit});
    const totalUsers = await this.count();

    const totalPages = Math.ceil(totalUsers / limit);
    const currentPage = Math.ceil(totalUsers % page);

    return {
      data: usersCollection,
      paging: {
        total: totalUsers,
        page: currentPage,
        pages: totalPages,
      },
    }
  }

  async findManagers() {
    const result = await this.userRepo.find({userType:"Manager"});
    return result
  }

  async deleteUser(query) {
    const updatedUsers = [];
    const { manager, _id, userType, employees } = await this.userRepo.findOneAndRemove(query)
    if (userType === "Manager") {
      for (const employee of employees) {
        const updatedUser = await this.userRepo.findByIdAndUpdate(
          employee._id,
          { "manager": '' }
        )
        updatedUsers.push(updatedUser);
      }
    }
    if (manager != '') {
      const updatedUser = await this.userRepo.findByIdAndUpdate(
        manager._id, {
        $pull: {
          employees: {
            _id: _id
          }
        }
      });
      updatedUsers.push(updatedUser);
    }
    return { deletedUserId: _id, updatedUsers: updatedUsers };
  }

  async getRoles() {
    const result = roles;
    return result;
  }

  async count() {
    return await this.userRepo.count();
  }
}
