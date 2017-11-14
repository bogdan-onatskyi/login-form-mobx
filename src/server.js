const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const {toString} = require('./utils/utils');

const PORT = 3000;
const PUBLIC_PATH = path.join(__dirname, 'docs');

const app = express();

if (process.env.NODE_ENV === 'development') {
    const webpack = require('webpack');
    const webpackConfig = require('../webpack.dev.js');
    const compiler = webpack(webpackConfig);

    app.use(require('webpack-dev-middleware')(compiler, {
        hot: true,
        stats: {
            colors: true
        },
        watchOptions: {
            aggregateTimeout: 0,
            poll: true
        },
        publicPath: webpackConfig.output.publicPath
    }));

    app.use(require('webpack-hot-middleware')(compiler));
}
else {
    app.use(express.static(PUBLIC_PATH));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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

    console.log('');
    console.log(toString('You posted:', req.body));
    console.log(toString('Server answered:', retData));
});

app.all("/", function (req, res) {
    res.sendFile(path.resolve(PUBLIC_PATH, 'index.html'));
});

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}...`);
});