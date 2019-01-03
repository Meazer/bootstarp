const path = require('path');
const post = require(path.join(__dirname, '..', 'database', 'models', 'Post'))

module.exports = async (req, res) => {

  const image = req.files.image;
  let imgPath = '';
  if (image) {
    await image.mv(path.join(__dirname, '..', 'public', 'postsImg', image.name));
    imgPath = `/postsImg/${image.name}`
  }
  post.create({
    ...req.body,
    image: imgPath
  }, (error, response) => {
    res.redirect('/');
  })
}