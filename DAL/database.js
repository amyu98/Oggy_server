var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose');

// Connection URI
let url = "mongodb+srv://oggyUser:Aa123456789@cluster0.cmqfr.mongodb.net/IAFproj?retryWrites=true&w=majority";

mongoose
    .connect(url, { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    });

const db = mongoose.connection;

module.exports = db;


