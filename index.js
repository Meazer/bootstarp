const express = require('express');
const path = require('path');
const expressEdge = require('express-edge');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const post = require(path.join(__dirname, '.', 'database', 'models', 'Post'));
const fileUpload = require('express-fileupload');

mongoose.connect('mongodb://localhost/node-js-blog');
const app = express();


app.use(express.static('public'));
app.use(expressEdge);
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload());

app.get('/', async (req, res) => {
  const posts = await post.find({});
  res.render('index', { posts });
})

app.get('/posts/new', (req, res) => {
  res.render('create');
})

app.post('/posts/store', async (req, res) => {

  const image = req.files.image;
  let imgPath = '';
  if (image) {
    await image.mv(path.join(__dirname, 'public', 'postsImg', image.name));
    imgPath = `/postsImg/${image.name}`
  }
  post.create({
    ...req.body,
    image: imgPath
  }, (error, response) => {
    res.redirect('/');
  })
})

app.get('/about', (req, res) => {
  res.render('about');
})
app.get('/contact', (req, res) => {
  res.render('contact');
})
app.get('/post/:id', async (req, res) => {
  const foundPost = await post.findById(req.params.id)
  res.render('post', { foundPost });
})


app.listen(4000, () => console.log('Server listen on port 4000'));