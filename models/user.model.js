const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema({
    username: { type: String, unique: true, required: true },
    fullname: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: Number, required: false },
    address: { type: String, required: false },
    state: { type: String, required: false },
    city: { type: String, required: false },
    createdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', schema);