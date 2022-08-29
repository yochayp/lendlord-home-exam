const mongoose = require('mongoose')
const users = require('../constants/users');

const collectionName = 'users'
const schemaName = 'users'
const SchemaTypes = mongoose.Schema

const roles = Object.values(users.USER_ROLES);

const schema = new mongoose.Schema(
  {
    _id: { type: SchemaTypes.ObjectId, auto: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, trim: true},
    dateStarted:{ type: Date, default : Date.now},
    salary:{ type: Number},
    userType: { type: String, enum : roles, default: 'Worker'},
    manager:{ _id: { type: SchemaTypes.Types.ObjectId, ref: 'users'},
              firstName: {type: String} },
    employees:[{
        id:{ type: SchemaTypes.Types.ObjectId, ref: 'users' },
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true }
      }]
  },
  { strict: false, autoCreate: true, timestamps: true }
)

const model = mongoose.model(schemaName, schema, collectionName)

module.exports = model
module.exports.schema = schema
