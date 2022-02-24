require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
var path = require('path')

const dbURI = "mongodb+srv://mr2160:MonkeyFingerHeShoot@cluster0.wn1wb.mongodb.net/monopoly?retryWrites=true&w=majority";
const dbURIdev = 'mongodb://localhost/monopoly';


if (process.env.NODE_ENV == 'nodemon')
  dbURI = dbURIdev;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,append,delete,entries,foreach,get,has,keys,set,values,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var cors=require('cors');
app.use(cors({origin:true,credentials: true}));

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
db = mongoose.connection

db.on('error', (err) => console.error(err))
db.once('open', () => console.log("Connected to database"))

app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')));

const posestiRouter = require("./routes/posesti")
app.use('/posesti', posestiRouter)

const dbRouter = require("./routes/db")
app.use('/dbapi', dbRouter)

const vodiRouter = require("./routes/vodi")
app.use('/vodi', vodiRouter)

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
  });

module.exports = app;