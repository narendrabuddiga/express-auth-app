const USERCOL = require('./../models/user.model');
const controller = require("../controllers/auth.controller");


exports.updateUser = (req, res) => {
    if (!req.body) {
        req.body = req.query;
    }
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    let userSchema = req.body;
    let query = {
        username: userSchema.username
    };
    let updateQuery = { $set: userSchema };

    USERCOL.findByIdAndUpdate(query, updateQuery, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: `Cannot update user with id=${id}  was not found!`
                });
            } else
                return res.send({ message: "User was updated successfully." });
        })
        .catch(err => {
            return res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

exports.addUser = (req, res) => {
    return controller.register(res, res);
};

exports.deleteUser = (req, res) => {
    let query = {};
    if (req.body.hasOwnProperty("id")) {
        query._id = req.body.id;
    } else {
        query._id = req.query.id;
    }

    USERCOL.findByIdAndRemove(query, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: `Cannot delete user with id=${id}. Maybe user was not found!`
                });
            } else {
                res.send({
                    message: "user was deleted successfully!"
                });
            }
        })
        .catch(err => {
            return res.status(500).send({
                message: "Could not delete user with id=" + id
            });
        });
};