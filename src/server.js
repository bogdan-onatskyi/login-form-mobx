const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const {toString, parseData} = require('./utils/utils');

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

    console.log('');
    console.log(toString('You posted:', req.body));

    res.setHeader('Content-Type', 'application/json');
    setTimeout(function () {
        const retData = parseData(req.body);

        res.send(JSON.stringify(retData));

        console.log(toString('Server answered:', retData));
    }, timeOut);
});

app.all("/", function (req, res) {
    res.sendFile(path.resolve(PUBLIC_PATH, 'index.html'));
});

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}...`);
});