const User = require('./models/user')
const Task = require('./models/Task')
const config = require('./BL/config');
const axios = require('axios');
const mongoose = require('mongoose');
const utilityManager = require('./BL/utilityManager');

module.exports.createUser = async function (req, res, next) {

    let user = new User(req.body);

    user._id = mongoose.Types.ObjectId();


    let uri = config.captainUpUrlBase + '/app/5fab9f52a39ad7174326f8c9/players?secret=' + config.captainUpSecret + '&user[id]=' + user._id + '&user[name]=' + 'U-' + user._id;

    try {
        let captainupResponse = await axios.post(uri);
        if (captainupResponse && captainupResponse.data) {
            user.captainUpId = captainupResponse.data.data.id
        } else {
            throw '';
        }
    } catch (error) {
        res.status(500).text("Failed to create user in CaptainUp server")
    }

    let dbUser = await User.create(user)
        .catch(er => {
            res.json(er);
        })

    res.json(dbUser);
}

// TODO AUTH
module.exports.getAll_NOCAPTAINUP = async function (req, res, next) {

    let allUsers = await User.find();

    res.json(allUsers);
}

// TODO AUTH
module.exports.getUserByUsername = async function (req, res, next) {

    let user = await User.findOne({ username: req.query.username }).lean();

    let captainUpUser;

    try {
        captainUpUser = await utilityManager.getCaptainUpDetails(user.captainUpId);
    } catch (error) {
        res.status(500).text("Failed to find user in CaptainUp server")
    }

    user.captainUpDetails = captainUpUser.data.data;

    res.json(user);
}

// TODO AUTH
module.exports.uploadFile = async function (req, res, next) {

    res.json("TODO!");

}

module.exports.createTask = async function (req, res, next) {

    // TODO manipulate body.

    let body = { ...req.body };

    body._id = mongoose.Types.ObjectId();

    // TODO edit body with elevent details (like creator).
    // TODO connect to captainup
    // let captainUpTask = await utilityManager.createCaptainUpTaskAction(body);

    let task = new Task(body)

    let dbTask = await Task.create(task)
        .catch(er => {
            res.json(er);
        })

    res.json(dbTask);
}

module.exports.getAllTasks = async function (req, es, next) {
    let tasks = Task.find();

    res.json(tasks);
}