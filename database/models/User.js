const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

userSchema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, encrypted) => {
    user.password = encrypted;
    next();
  })
});

module.exports = new mongoose.model('User', userSchema);