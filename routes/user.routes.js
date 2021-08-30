const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.put('auth/edit', authJwt.verifyToken, controller.updateUser);
    app.post('auth/adduser', authJwt.verifyToken, controller.addUser);
    app.delete('auth/deleteuser', authJwt.verifyToken, controller.deleteUser);
};