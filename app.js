const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');
const PORT= process.env.PORT ||  3001;
mongoose.connect('mongodb+srv://alexander_speek:123321sanek@cluster0-x5rsp.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology: true },function (err) {
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
app.use('/api/word/',require('./routes/wordAPI/word'));

if (process.env.NODE_ENV === 'production'){
    app.use(express.static('front/build'));
    app.get('*',(req,res) => {
        res.sendFile(path.join(__dirname,'front','build','index.html'));
    })
}




app.listen(PORT,() => {
    console.log("Server starting ...");
});