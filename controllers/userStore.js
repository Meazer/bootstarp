const path = require('path');
const user = require(path.join(__dirname, '..', 'database', 'models', 'User.js'));

module.exports = (req, res) => {
  user.create(req.body, (error, user) => {
    if (error) {
      req.flash('registrationErrors', Object.keys(error.errors).map(key => error.errors[key].message));
      req.flash('data', req.body);
      return res.redirect('/auth/register');
    }
    res.redirect('/')
  })
}