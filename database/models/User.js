const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide an username'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: 'That email is already taken'
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  }
});

userSchema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, encrypted) => {
    user.password = encrypted;
    next();
  })
});

module.exports = new mongoose.model('User', userSchema);