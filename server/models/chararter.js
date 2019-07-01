'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SentenceSchema = require('../models/sentence').SentenceSchema;

var CharaterSchema = Schema({
    english: String,
    spanish: String,
    mandarin: String,
    type: String,
    sentence: [SentenceSchema],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model('Chararter', CharaterSchema);