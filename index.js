const express = require('express');
const path = require('path');
const expressEdge = require('express-edge');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const edge = require('edge.js');

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
const auth = require(path.join(__dirname, 'middleware', 'auth.js'));
const redirectIfAuth = require(path.join(__dirname, 'middleware', 'redirectIfAuth.js'));
const logoutController = require(path.join(__dirname, 'controllers', 'userLogout.js'));

mongoose.connect('mongodb://localhost/node-js-blog', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true)
const app = express();

app.use(session({
  secret: 'secret',
  store: new mongoStore({ mongooseConnection: mongoose.connection }),
  resave: true,
  saveUninitialized: true
}))
app.use(express.static('public'));
app.use(expressEdge);
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload());
app.use(flash());
app.use('*', (req, res, next) => {
  edge.global('auth', req.session.userId);
  next();
});

app.get('/', homePageController)
app.get('/posts/new', auth, createPostController)
app.post('/posts/store', auth, storePostController)
app.get('/about', aboutPageController)
app.get('/contact', contactPageController)
app.get('/post/:id', getPostController)
app.get('/auth/register', redirectIfAuth, userRegisterController);
app.post('/users/register', redirectIfAuth, userStoreController);
app.get('/auth/login', redirectIfAuth, loginController);
app.post('/users/login', redirectIfAuth, userLoginController);
app.get('/auth/logout', logoutController);

app.listen(4000, () => console.log('Server listen on port 4000'));