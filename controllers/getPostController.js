const path = require('path');
const post = require(path.join(__dirname, '..', 'database', 'models', 'Post'))

module.exports = async (req, res) => {
  const foundPost = await post.findById(req.params.id)
  res.render('post', { foundPost });
}