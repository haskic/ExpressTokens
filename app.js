const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


mongoose.connect('mongodb://127.0.0.1:27017/zhakar',{ useNewUrlParser: true,useUnifiedTopology: true },function (err) {
    if(err) throw err;
    console.log("Mongo connected");
});
mongoose.set('useFindAndModify', false);

const urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(bodyParser.json());
app.use(cors());

app.use('/api/login',urlencodedParser,require('./routes/api/login'));
app.use('/api/reg',require('./routes/api/registration'));
app.use('/api/logout',require('./routes/api/logout'));
app.use('/api/refreshToken',require('./routes/api/retoken'));



app.post('/request', function (req, res) {
    console.log("REQUEST ---- GET");
    console.log(req.body.name);
    const user = new User({
        name: req.body.name,
        lastName: req.body.lastName
    });
    user.save()
    res.send({
        answer: true
    })
})

app.listen(3001,() => {
    console.log("Server starting ...");
});