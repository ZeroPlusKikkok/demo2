// Data Model
const mongoose = require('mongoose');

const { Schema , model } = mongoose;

const Employee = new Schema ({
  idCard: String,
  fName: String,
  lName: String,
  position: String,
  section: String,
  deparetment: String,
  dateStart: String,
  iMage: String
},{
  timestamps: true
});


module.exports = model('Employee', Employee);
