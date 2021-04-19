// Server defaults.
const express = require('express');
const bodyParser = require('body-parser');
// const history = require('connect-history-api-fallback');
const http = require('http');
const app = express();
const cors = require('cors');

// DB connection.
const db = require('./DAL/database');
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', function () {
    console.log("We're connected to MongoDB-Atlas!");
});


// // Middlewares.
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(express.static(__dirname + '/dist/'))

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
// app.use(xss());
// app.use(mongoSanitize());

// enable cors
app.use(cors());
app.options('*', cors());

// Routing.

const router = require('./routers.route')

app.all('**', router)

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    res.status(404).send();
});

process.env.TZ = "Asia/Jerusalem";

// Select port using env or default 8080.
const httpPort = process.env.HTTP_PORT || 8080;
http.createServer(app).listen(httpPort);
console.log("http Server is live and running at port: " + httpPort);

module.exports = app;