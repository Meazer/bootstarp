const path = require('path');
const user = require(path.join(__dirname, '..', 'database', 'models', 'User.js'));
const bcrypt = require('bcryptjs');

module.exports = (req, res) => {
  const { email, password } = req.body;
  user.findOne({ email }, (error, foundUser) => {
    if (foundUser) {
      bcrypt.compare(password, foundUser.password, (error, same) => {
        if (same) {
          req.session.userId = foundUser._id;
          res.redirect('/');
        } else {
          res.redirect('/auth/login');
        }
      })
    } else {
      res.redirect('/auth/login');
    }
  })
}