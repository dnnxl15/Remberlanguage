'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    lastName: String,
    username: String,
    mail: String,
    password: String,
    role: String,
    image: String,
    sex: String
});

module.exports = mongoose.model('User', UserSchema);