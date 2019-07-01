
var sentenceFunction = 
{
    addSentence: async function(characterId, sentence)
    {
        const character = await Character.findById(characterId);
        character.author.push(sentence);
        character.save();
    }
}