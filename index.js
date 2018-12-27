const express = require('express');
const path = require('path');
const expressEdge = require('express-edge');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/node-js-blog');
const app = express();

app.use(express.static('public'));
app.use(expressEdge);
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/posts/new', (req, res) => {
  res.render('create');
})

app.get('/about', (req, res) => {
  res.render('about');
})
app.get('/contact', (req, res) => {
  res.render('contact');
})
app.get('/post', (req, res) => {
  res.render('post');
})


app.listen(4000, () => console.log('Server listen on port 4000'));