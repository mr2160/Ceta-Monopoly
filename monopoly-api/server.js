require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 3000
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,append,delete,entries,foreach,get,has,keys,set,values,Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var cors=require('cors');
app.use(cors({origin:true,credentials: true}));

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
db = mongoose.connection
db.on('error', (err) => console.error(err))
db.once('open', () => console.log("Connected to database"))

app.use(express.json())
app.use(express.static(process.cwd()+"/../monopoly/dist/monopoly/"));
const posestiRouter = require("./routes/posesti")
app.use('/posesti', posestiRouter)

const dbRouter = require("./routes/db")
app.use('/dbapi', dbRouter)

const vodiRouter = require("./routes/vodi")
app.use('/vodi', vodiRouter)

app.get('/', (req,res) => {
    res.sendFile(process.cwd()+"/../monopoly/dist/monopoly/index.html")
  });

app.listen(port, () => console.log("Server started"))