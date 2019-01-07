const path = require('path');
const post = require(path.join(__dirname, '..', 'database', 'models', 'Post'));
const user = require(path.join(__dirname, '..', 'database', 'models', 'User'));

module.exports = async (req, res) => {
  const foundPost = await post.findById(req.params.id);
  const foundUser = await user.findById(foundPost.user_id);
  res.render('post', { foundPost, username: foundUser.username });
}