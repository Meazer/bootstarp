const express = require('express');
const path = require('path');
const expressEdge = require('express-edge');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const post = require(path.join(__dirname, '.', 'database', 'models', 'Post'));
const fileUpload = require('express-fileupload');

const homePageController = require(path.join(__dirname, 'controllers', 'homePageController.js'));
const createPostController = require(path.join(__dirname, 'controllers', 'createPostController.js'));
const storePostController = require(path.join(__dirname, 'controllers', 'storePostController.js'));
const aboutPageController = require(path.join(__dirname, 'controllers', 'aboutPageController.js'));
const contactPageController = require(path.join(__dirname, 'controllers', 'contactPageController.js'));
const getPostController = require(path.join(__dirname, 'controllers', 'getPostController.js'));

mongoose.connect('mongodb://localhost/node-js-blog');
const app = express();

app.use(express.static('public'));
app.use(expressEdge);
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload());

app.get('/', homePageController)
app.get('/posts/new', createPostController)
app.post('/posts/store', storePostController)
app.get('/about', aboutPageController)
app.get('/contact', contactPageController)
app.get('/post/:id', getPostController)

app.listen(4000, () => console.log('Server listen on port 4000'));