const mongoose = require("mongoose");


const WordSchema = mongoose.Schema({
    word: String,
    translate: String,
    language: String,
    translateLanguage: String
});

module.exports = {
    model: mongoose.model('word',WordSchema),
    schema: WordSchema
};