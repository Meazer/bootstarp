const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'index.html'));
})
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', './index.html'));
})
app.get('/about.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'about.html'));
})
app.get('/contact.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'contact.html'));
})
app.get('/post.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'post.html'));
})


app.listen(4000, () => console.log('Server listen on port 4000'));