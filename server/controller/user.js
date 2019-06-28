'use strict'

var User = require('../models/user');
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

    saveUser: function(req, res)
    {
        var user = new User();
        var params = req.body;
        user.name = params.name;
        user.lastName = params.lastName;
        user.username = params.username;
        user.mail = params.mail;
        user.password = params.password;
        user.role =  params.role;
        user.image =  null;
        user.sex =  params.sex;


        user.save((err, UserStored) =>
        {
            if(err) return res.status(500).send({message: "Error to save the document"});

            if(!UserStored) return res.status(404).send({message: 'Couldnt save the file'});

            return res.status(200).send({User: UserStored});
        });
    },

    getUserId: function(req, res)
    {
        let nickname = "joelcito2000";
        var id = ""; 
        User.findOne({username: nickname}, '_id').exec(function (err, user) {
            if(err) return res.status(500).send({message: "Error to save the document"});

            if(!user) return res.status(404).send({message: 'Couldnt save the file'});

            id = user._id;
            console.log(id);
        });
        console.log(id);
    },

    getUser: function(req, res)
    {
        var UserId = req.params.id;

        if(UserId == null) return res.status(404).send({message: 'The User doesnt exists'});

        User.findById(UserId, (err, UserStored) => {

            if(err) return res.status(500).send({message: "Error to get the document"});

            if(!UserStored) return res.status(404).send({message: 'Couldnt find the file'});

            return res.status(200).send({User:UserStored});
        });
    },

    getUsers: function(req, res)
    {
        User.find({}).sort('year').exec((err, users) => {

            if(err) return res.status(500).send({message: "Error to get the documents"});

            if(!users) return res.status(404).send({message: 'Couldnt find the file'});

            return res.status(200).send({users});
        });
    },

    updateUser: function(req, res)
    {
        var UserId = req.params.id;
        var update = req.body;

        User.findByIdAndUpdate(UserId, update, (err, UserUpdate) => {
            if(err) return res.status(500).send({message: "Error to update the documents"});

            if(!UserUpdate) return res.status(404).send({message: 'Couldnt update the file'});

            return res.status(200).send({User: UserUpdate});
        });
    },

    deleteUser: function(req, res)
    {
        var UserId = req.params.id;
        User.findByIdAndDelete(UserId, (err, UserRemoved) =>
        {
            if(err) return res.status(500).send({message: "Error to delete the documents"});

            if(!UserRemoved) return res.status(404).send({message: 'Couldnt delete the file'});

            return res.status(200).send({User: UserRemoved});
        });
    },

    uploadImage: function(req, res)
    {
        var UserId = req.params.id;
        var fileName = 'Doesnt upload the image';
        if(req.files)  
        {
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif')
            {
                User.findByIdAndUpdate(UserId, {image: fileName}, (err, UserUpdated) => {
                    if(err) return res.status(500).send({message: 'The image didnt upload'});
    
                    if(!UserUpdated) return res.status(404).send({message: 'The image doesnt exits and the image havent been assigned'});
    
                    return res.status(200).send({
                        project: fileName
                   });
               });
            }
            else
            {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({message: "The extension is not valid"});
                });
            }
        }
        else
        {
            return res.status(200).send({
                message: fileName
            });
        }
        
    }
};

module.exports = controller;