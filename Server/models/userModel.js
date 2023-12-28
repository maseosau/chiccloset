const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
    fullname: {type: String},
    image: {type: String},
    email: {type: String, required: true, unique: true},
    phoneNumber: {type: String},
    address: {type: String},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    create_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now},
})

module.exports = mongoose.model('Users', Users);