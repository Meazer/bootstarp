const path = require('path');
const post = require(path.join(__dirname, '..', 'database', 'models', 'Post'))

module.exports = async (req, res) => {
  const posts = await post.find({});
  res.render('index', { posts });
}