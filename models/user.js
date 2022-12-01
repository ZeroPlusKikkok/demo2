// Data Model
const mongoose = require('mongoose');

const { Schema , model } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema ({
  idUser: String,
  fName: String,
  lName: String,
  username: String
},{
  timestamps: true
});

User.plugin(passportLocalMongoose);

module.exports = model('User', User);
