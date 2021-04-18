const express = require('express');
const history = require('connect-history-api-fallback');
const http = require('http');
const db = require('./DAL/database');

const httpPort = process.env.HTTP_PORT || 8080;

const router = require('./router')

const cors = require('cors');

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', function () {
    console.log("We're connected to MongoDB-Atlas!");
});

const app = express();
app.use(cors());
app.use(history());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(bodyParser.json({ limit: '50mb' }))

app.use(express.static(__dirname + '/dist/'))

// TODO just for client server connection
app.use('**', router)

http.createServer(app).listen(httpPort);

console.log("http Server is live and running at port: " + httpPort);

