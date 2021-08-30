const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const auth = require('./../middlewares/authJwt');
const localStorage = require('localStorage');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/auth/register", [
            verifySignUp.checkDuplicateUsernameOrEmail,
        ],
        controller.register
    );

    app.post('/auth/login', controller.login);
    app.post('/req/login', controller.login, (req, res) => {
        let currentUserData = JSON.parse(localStorage.getItem('currentUserData'));
        return res.send(currentUserData);
    });

    app.post('/auth/getusers', controller.getUsers);

    app.post('/auth/validate', [auth.verifyToken]);

};