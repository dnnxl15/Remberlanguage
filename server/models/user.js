'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    _id: mongoose.Schema.Types.ObjectId,
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