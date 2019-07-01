'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SentenceSchema = new mongoose.Schema({
    sentence: String
});

module.exports.Sentence = mongoose.model('Sentence', SentenceSchema);
module.exports.SentenceSchema = SentenceSchema;