const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('*', function(req, res) {
   res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.get('/ping', function (req, res) {
 return res.json({"test":"pong"});
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

console.log("started!");

app.listen(process.env.PORT || 8080);