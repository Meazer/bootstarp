module.exports = (req, res) => {
  req.session.userId ? res.render('create') : res.redirect('/auth/login');
}