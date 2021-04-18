const User = require('./models/user')

module.exports.createUser = async function (req, res, next) {

    // TODO
    let user = new User(req.body)

    let dbUser = await User.create(user)
        .catch(er => {
            res.json(er);
        })

    res.json(user);
}

// TODO AUTH
module.exports.getAll = async function (req, res, next) {

    let allUsers = await User.find();

    res.json(allUsers);

}