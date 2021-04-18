// Server defaults.
const express = require('express');
const bodyParser = require('body-parser');
const history = require('connect-history-api-fallback');
const http = require('http');
const app = express();

// DB connection.
const db = require('./DAL/database');
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', function () {
    console.log("We're connected to MongoDB-Atlas!");
});


// Middlewares.
const cors = require('cors');
app.use(cors());
app.use(history());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(bodyParser.json({ limit: '50mb' }))
app.use(express.static(__dirname + '/dist/'))



// Routing.
const router = require('./router')
// TODO just for client server connection
app.use('**', router)


// Select port using env or default 8080.
const httpPort = process.env.HTTP_PORT || 8080;
http.createServer(app).listen(httpPort);
console.log("http Server is live and running at port: " + httpPort);

