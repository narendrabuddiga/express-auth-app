const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const db = require('./models/index');
const app = express();
const dbConfig = require('./db.config');
const localStorage = require('localStorage');


var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));


app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'views')));

app.set('view engine', 'ejs');

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/login.html"));
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/register.html"));
});

app.get("/auth/user/:userid", (req, res) => {
    let currentUserData = JSON.parse(localStorage.getItem('currentUserData'));
    let usersList = localStorage.getItem('usersList');
    res.render('user', {
        title: `Welcome ${currentUserData.username}`,
        user: currentUserData,
        usersList: JSON.parse(usersList)
    });
});

db.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`);
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// set port, listen for requests

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});