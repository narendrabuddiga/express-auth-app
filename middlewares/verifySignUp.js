const USER = require('./../models/user.model');

const checkDuplicateUsernameOrEmail = (req, res, next) => {
    let query = { username: req.body.username };
    USER.findOne(query, (err, user) => {
        if (err) {
            return res.status(500).send({ message: err });
        }
        if (user) {
            return res.status(400).send({ message: "Failed! Username is already in use!" });
        }
        USER.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                return res.status(500).send({ message: err });
            }
            if (user) {
                return res.status(400).send({ message: "Failed! Email is already in use!" });
            }
            next();
        });
    });
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;