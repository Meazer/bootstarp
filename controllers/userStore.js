const path = require('path');
const user = require(path.join(__dirname, '..', 'database', 'models', 'User.js'));

module.exports = (req, res) => {
  user.create(req.body, (error, user) => {
    if (error) return res.redirect('/auth/register');
    res.redirect('/')
  })
}