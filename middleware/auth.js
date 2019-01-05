const path = require('path');
const user = require(path.join('..', 'database', 'models', 'User.js'));

module.exports = (req, res, next) => {
  user.findById(req.session.userId, (error, foundUser) => {
    if (foundUser) return next();
    res.redirect('/');
  })
}