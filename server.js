var express = require('express');
var history = require('connect-history-api-fallback');
var http = require('http');
var db = require('./DAL/database');

var httpPort = process.env.HTTP_PORT || 8080;

var cors = require('cors');

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', function () {
    console.log("We're connected to MongoDB-Atlas!");
});

var app = express();
app.use(cors());
app.use(history());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.json({limit: '50mb'}))

app.use(express.static(__dirname + '/dist/'))
require('./routes.js')(app,express, db);


http.createServer(app).listen(httpPort);

console.log("http Server is live and running at port: " + httpPort);

