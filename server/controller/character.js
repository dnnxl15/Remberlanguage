'use strict'

var Character = require('../models/chararter');
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

    saveCharacter: function(req, res)
    {
        var character = new Character();
        var params = req.body;
        character.english = params.english;
        character.spanish = params.spanish;
        character.mandarin = params.mandarin;
        character.type = params.type;
        character.author =  params.author;

        Character.save((err, CharacterStored) =>
        {
            if(err) return res.status(500).send({message: "Error to save the document"});

            if(!CharacterStored) return res.status(404).send({message: 'Couldnt save the file'});

            return res.status(200).send({Character: CharacterStored});
        });
    },

    getCharacter: function(req, res)
    {
        var CharacterId = req.params.id;

        if(CharacterId == null) return res.status(404).send({message: 'The Character doesnt exists'});

        Character.findById(CharacterId, (err, CharacterStored) => {

            if(err) return res.status(500).send({message: "Error to get the document"});

            if(!CharacterStored) return res.status(404).send({message: 'Couldnt find the file'});

            return res.status(200).send({Character:CharacterStored});
        });
    },

    getCharacters: function(req, res)
    {
        Character.find({}).sort('year').exec((err, Characters) => {

            if(err) return res.status(500).send({message: "Error to get the documents"});

            if(!Characters) return res.status(404).send({message: 'Couldnt find the file'});

            return res.status(200).send({Characters});
        });
    },

    updateCharacter: function(req, res)
    {
        var CharacterId = req.params.id;
        var update = req.body;

        Character.findByIdAndUpdate(CharacterId, update, (err, CharacterUpdate) => {
            if(err) return res.status(500).send({message: "Error to update the documents"});

            if(!CharacterUpdate) return res.status(404).send({message: 'Couldnt update the file'});

            return res.status(200).send({Character: CharacterUpdate});
        });
    },

    deleteCharacter: function(req, res)
    {
        var CharacterId = req.params.id;
        Character.findByIdAndDelete(CharacterId, (err, CharacterRemoved) =>
        {
            if(err) return res.status(500).send({message: "Error to delete the documents"});

            if(!CharacterRemoved) return res.status(404).send({message: 'Couldnt delete the file'});

            return res.status(200).send({Character: CharacterRemoved});
        });
    },

    
};

module.exports = controller;