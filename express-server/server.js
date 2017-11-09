const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.post('/login', function (req, res) {

    const timeOut = 1000;
    const {Username, Password} = req.body;

    let retData = {
        Auth: "Denied"
    };

    if (Username === 'User' && Password === 'Password')
        retData = {
            Auth: "Logged",
            Language: "EN"
        };

    res.setHeader('Content-Type', 'application/json');
    setTimeout(function () {
        res.send(JSON.stringify(retData));
    }, timeOut);

    const valuesArray = [];
    for (let prop in req.body) {
        valuesArray.push(prop + ':' + req.body[prop]);
    }
    console.log(`You posted: { ${valuesArray.join(', ')} }`);

    valuesArray.splice(0);
    for (let prop in retData) {
        valuesArray.push(prop + ':' + retData[prop]);
    }
    console.log(`Server answered: { ${valuesArray.join(', ')} }\n`);
});

app.listen(8080, function () {
    console.log('Server is running on: http://localhost:8080');
});