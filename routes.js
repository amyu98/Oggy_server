
var dal = require("./DAL/database");
var generalCalc = require("./BL/generalCalc.js");
var config = require("./BL/config.js");
const jwt = require('jsonwebtoken');
const Training = require('./schemas/training-schema');

module.exports = function (app, express, db) {
    app.get('/api/trainings', async function(req, res) {
        await Training.find({}, (err, trainings) => {
            if (err) {
                return res.status(400);
            }
            if (!trainings.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `Trainings not found` })
            }
            return res.status(200).json({ trainings })
        }).catch(err => console.log(err))
    });

    app.get('/api/training/:id', async function(req, res) {
        await Training.find({_id: req.params.id}, (err, trainings) => {
            if (err) {
                return res.status(400);
            }
            if (!trainings.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `Trainings not found` })
            }
            return res.status(200).json({ trainings })
        }).catch(err => console.log(err))
    });

    app.post('/api/training', function (req, res) {
        const body = req.body;

        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a comment',
            })
        }

        const training = new Training(body);

        if (!training) {
            return res.status(400).json({ success: false, error: "error with training object" });
        }

        training.save()
            .then(() => {
                return res.send(200);
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'error in saving',
                })
            })
    });

    app.delete('/api/delete/:id', async function (req, res) {
        await Training.findOneAndDelete({_id: req.params.id}).then(idea => {
            if (!idea) {
                return res
                    .status(404)
                    .json({ success: false, error: ` not found` })
            }
            return res.status(200).json({ idea })


        }).catch(err => {
            return res.status(400).json({
                err
            })

    });
    } )
};

function isLoggedIn(req, res, next) {
    var legit = jwt.verify(req.query.token, config.secret);
    if (legit.id === req.query.username) {
        return next();
    }
}