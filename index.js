const express = require('express');
const path = require('path');
const expressEdge = require('express-edge');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const session = require('express-session');

const homePageController = require(path.join(__dirname, 'controllers', 'homePage.js'));
const createPostController = require(path.join(__dirname, 'controllers', 'createPost.js'));
const storePostController = require(path.join(__dirname, 'controllers', 'storePost.js'));
const aboutPageController = require(path.join(__dirname, 'controllers', 'aboutPage.js'));
const contactPageController = require(path.join(__dirname, 'controllers', 'contactPage.js'));
const getPostController = require(path.join(__dirname, 'controllers', 'getPost.js'));
const userRegisterController = require(path.join(__dirname, 'controllers', 'userRegister.js'));
const userStoreController = require(path.join(__dirname, 'controllers', 'userStore.js'));
const loginController = require(path.join(__dirname, 'controllers', 'login.js'));
const userLoginController = require(path.join(__dirname, 'controllers', 'userLogin.js'));

mongoose.connect('mongodb://localhost/node-js-blog', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true)
const app = express();

app.use(session({
  secret: 'secret'
}))
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
app.get('/auth/register', userRegisterController);
app.post('/users/register', userStoreController);
app.get('/auth/login', loginController);
app.post('/users/login', userLoginController);


app.listen(4000, () => console.log('Server listen on port 4000'));