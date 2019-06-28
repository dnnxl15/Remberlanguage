'use strict'

var express = require('express');
var UserController = require('../controller/user');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads'});

router.get('/home', UserController.home);
router.post('/test', UserController.test);
router.post('/save-user', UserController.saveUser);
router.get('/User', UserController.getUsers);
router.get('/User/:id?', UserController.getUser);
router.put('/User/:id', UserController.updateUser);
router.delete('/User/:id', UserController.deleteUser);
router.post('/upload-image/:id', multipartMiddleware, UserController.uploadImage);

module.exports = router;