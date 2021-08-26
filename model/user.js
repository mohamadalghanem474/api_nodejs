const mongoose = require("mongoose");

const users = mongoose.Schema({
  name: String,
  phone: Number,
  image : String
});
module.exports = mongoose.model('User',users);