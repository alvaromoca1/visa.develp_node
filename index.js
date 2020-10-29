const express = require('express');
const fs = require('fs');
var https = require('https');
const request = require('request');
const app = express();
const bodyParser = require('body-parser')
var path = require('path');
var crypto = require('crypto');


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

var username = 'PJOO44Y2P2PQ2CPQUGFX21LdwSqwPWXiKGVTFZwwcjavsN_O0';
var password = 'RdRSvH9nfSz8U4oCAgCVSYq23RlomuP9h';
var key = 'privateKey.pem';
var cert = 'cert.pem';

app.get('/', (req, res) => {

    var options = {
        hostname: 'sandbox.api.visa.com',
        port: 443,
        uri: 'https://sandbox.api.visa.com/vdp/helloworld',
        method: 'GET',
        key: fs.readFileSync(key),
        cert: fs.readFileSync(cert),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
        },
        json: true
    };

    options.agent = new https.Agent(options);

    request.get(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        console.log(`Status: ${res.statusCode}`);
        console.log(body);
    });
    res.send('Funciona');
});

app.listen(3050, function () {
    console.log('Example app listening on port 3050.');
})
