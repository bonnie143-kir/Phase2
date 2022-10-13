// Install dependencies required for this server.js file
var express = require('express');
var app = express();
var http = require('http').Server(app);
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const cors = require('cors');
app.use(cors());

// this is where the routes/endpoints go

const https = require('https'),
    fs = require('fs'),
    options = {
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem')
},
httpsServer = https.createServer(options, app);

const PORT = 3000;
httpsServer.listen(PORT, ()=> {
    console.log('Starting https server at: ${PORT}');
});
