// Install dependencies required for this server.js file
var express = require('express');
var app = express();
var http = require('http').Server(app);
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const cors = require('cors');
app.use(cors());

// setting up mongoclient
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var mongodb = require('mongodb');
var ObjectId = mongodb.ObjectId;

// this is where the routes/endpoints go
app.post('/auth', function(req, res){
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function(err, client) {
        if (err) throw err;
        let db = client.db("chat");
        db.collection("users").find({}).toArray(function(err, docs) {
            if (err) throw err;
            console.log("Found the following records");
            console.log(docs);
            for (let i=0; i<users.length; i++){
                if (req.body.email == users[i].email){
                    console.log(users[i]);
                    res.send("exists");
                }else{
                    res.send("no");
                }
            }
            res.send(docs);
            client.close();
        });
    });
});

const https = require('https'),
    fs = require('fs'),
    options = {
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem')
},
httpsServer = https.createServer(options, app);

const PORT = 3000;
httpsServer.listen(PORT, ()=> {
    console.log('Starting https server at: ', PORT);
});
