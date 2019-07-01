'use strict'

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));


var Sentence = require('../models/sentence').Sentence;
var Character = require('../models/chararter');

var User = require('../models/user');

async function addSentence(characterId, sentence)
{
  const character = await Character.findById(characterId);
  character.author.push(sentence);
  character.save();
}

async function removeSentence(characterId, sentenceId)
{
  const character = await Character.findById(characterId);
  const sentences = character.sentence.id(sentenceId);
  sentences.remove();
  sentences.save();
}

async function createCharacter(english, spanish, mandarin, type, sentence) {
    const character = new Character({
        english,
        spanish,
        mandarin,
        type,
        sentence
    }); 
    
    const result = await character.save();
    console.log(result);
  }

  async function listSentences(characterId) { 
    const characters = await Character.findById(characterId);
    console.log(characters.sentence);
  }

  async function createUser() {
    const user = new User({
        name: "Mario"
    }); 
    
    const result = await user.save();
    console.log(result);
  }

  async function createCharacter() {
    const character = new Character({
        english: "String,",
        spanish: "String",
        mandarin:" String",
        type: "String",
        
        author: "5d16ffc91cb76d4ff4702040"
    }); 
    
    const result = await character.save();
    console.log(result);
  }

  async function listUser() { 
    const user = await User.find();
    console.log(user);
  }

  listUser() ;
  //createUser() ;
  //createCharacter("Hello", "Hola", "你好", "Verb", new Sentence({sentence: "Hello world" }));
  listSentences("5d16f9c12a7a3b2e689d24d1");
createCharacter();