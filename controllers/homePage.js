const path = require('path');
const post = require(path.join(__dirname, '..', 'database', 'models', 'Post'))
const user = require(path.join(__dirname, '..', 'database', 'models', 'User'))

module.exports = async (req, res) => {
  const posts = await post.find({});
  for (let i = 0; i < posts.length; i++) {
    const foundUser = await user.findById(posts[i].user_id);
    posts[i].username = foundUser.username;
  }
  res.render('index', { posts });
}