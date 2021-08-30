const config = require("../config/auth.config");
const USERCOL = require('./../models/user.model');
const localStorage = require('localStorage');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const register = (req, res) => {
    if (!req.body) {
        req.body = req.query;
    }
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    let userSchema = {
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        phone: req.body.phone,
        address: req.body.address,
        state: req.body.state,
        city: req.body.city
    };
    const user = new USERCOL(userSchema);

    USERCOL.save(user, (err, user) => {
        if (err) {
            return res.status(500).send({ message: err });
        }
        return res.status(200).send({ message: "User was registered successfully!" });
    });
};

const getUsers = (req, res) => {
    let query = {};
    if (req.body.hasOwnProperty('username')) {
        query = {
            _id: { $nin: req.body.username }
        };
    } else {
        query = {
            _id: { $nin: req.query.username }
        };
    }
    USERCOL.find(query).exec((err, usersList) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!usersList) {
            res.data = [];
        } else {
            localStorage.setItem('usersList', JSON.stringify(usersList));
        }
        res.redirect(`user/${req.body.id}`);
    });
};

const login = (req, res) => {

    if (!req.body.hasOwnProperty('username'))
        req.body = req.query;
    let query = {
        username: req.body.username
    };

    USERCOL.findOne(query).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        let result = {
            status: 200,
            id: user._id,
            username: user.username,
            email: user.email,
            accessToken: token
        };

        console.log('Got the token: ', result.accessToken);
        localStorage.setItem('token', result.accessToken);
        localStorage.setItem('currentUserData', JSON.stringify(result));
        req.body = result;
        if (req.query) {
            return res.send(result);
        } else
            return getUsers(req, res);
    });
};

exports.register = register;
exports.login = login;
exports.getUsers = getUsers;