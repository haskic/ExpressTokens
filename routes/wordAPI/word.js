const express = require("express");
const router = express.Router();
const Word = require("./../../Models/Word");
const User = require("./../../Models/User");

const auth = require('./../../middleware');
router.post('/add', auth,(req, res) => {
    let {word, translate, language, translateLanguage} = req.body;

    const newWord = new Word.model({
        word,translate,language,translateLanguage}
    );

    User.findOneAndUpdate({'email': req.user.email},{$push: {'words': newWord}},function (err) {
        if (err) throw err;
        else{
            res.send({info: "Word was added"});
        }
    })
});

router.post('/delete',auth,(req,res) => {
    let {word} = req.body;
    User.findOneAndUpdate({'email': req.user.email}, { $pull: {'words': {'word': word}}},function(err){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json({
            info: "Word deleted success"
        });
    });
});

router.post('/get',auth,(req,res) => {
    User.findOne({email: req.user.email},function (err,findObj) {
        if (err) throw err;
        if (findObj) {
            res.send(findObj.words);
        }
        else{
            res.status(400).send();
        }

    })
})

module.exports = router;
