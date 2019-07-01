'use strict'

var Sentence = require('../models/sentence');
var fs = require('fs');

var controller =
{
    home: function(req, res)
    {
        return res.status(200).send({
            message: 'I am home'
        });
    },

    test: function(req, res)
    {
        return res.status(200).send({
            message: 'I am method or action test of the controller'
        });
    },

    addSentence: function(req, res)
    {
        var sentence = new Sentence();
        var params = req.body;
        sentence.sentence = params.sentence;

        Sentence.save((err, SentenceStored) =>
        {
            if(err) return res.status(500).send({message: "Error to save the document"});

            if(!SentenceStored) return res.status(404).send({message: 'Couldnt save the file'});

            return res.status(200).send({sentence: SentenceStored});
        });
    },

    getSentence: function(req, res)
    {
        var SentenceId = req.params.id;

        if(SentenceId == null) return res.status(404).send({message: 'The Sentence doesnt exists'});

        Sentence.findById(SentenceId, (err, SentenceStored) => {

            if(err) return res.status(500).send({message: "Error to get the document"});

            if(!SentenceStored) return res.status(404).send({message: 'Couldnt find the file'});

            return res.status(200).send({Sentence:SentenceStored});
        });
    },

    getSentences: function(req, res)
    {
        Sentence.find({}).sort('year').exec((err, Sentences) => {

            if(err) return res.status(500).send({message: "Error to get the documents"});

            if(!Sentences) return res.status(404).send({message: 'Couldnt find the file'});

            return res.status(200).send({Sentences});
        });
    },

    updateSentence: function(req, res)
    {
        var SentenceId = req.params.id;
        var update = req.body;

        Sentence.findByIdAndUpdate(SentenceId, update, (err, SentenceUpdate) => {
            if(err) return res.status(500).send({message: "Error to update the documents"});

            if(!SentenceUpdate) return res.status(404).send({message: 'Couldnt update the file'});

            return res.status(200).send({Sentence: SentenceUpdate});
        });
    },

    deleteSentence: function(req, res)
    {
        var SentenceId = req.params.id;
        Sentence.findByIdAndDelete(SentenceId, (err, SentenceRemoved) =>
        {
            if(err) return res.status(500).send({message: "Error to delete the documents"});

            if(!SentenceRemoved) return res.status(404).send({message: 'Couldnt delete the file'});

            return res.status(200).send({Sentence: SentenceRemoved});
        });
    },

    
};

module.exports = controller;