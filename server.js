const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://nhunt3:pass123@ds133136.mlab.com:33136/schedulingapp';
var db = null;

MongoClient.connect(url, {useNewUrlParser:true}, function(err, client) {
    if (err) {console.log('Error with Mongo connecting!', err);}
    console.log("Connected successfully to server");
    db = client.db('schedulingapp');
});

app.get('/getTimes', function (req, res) {
    db.collection('times').find({}).toArray(function(err, data) {
        if (err) {console.log('Error finding collection!', err);}

        res.json(data);
    });
});

app.post('/editData', function (req, res) {
    const query = {time: req.body.time};
    const newValues =
        {$set: {
            status: "booked"
        }};

    db.collection('times').updateOne(query, newValues, function(err, resp) {
        if (err) {console.log('Error updating record!', err);}
    });
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

console.log("started!");

app.listen(process.env.PORT || 8080);