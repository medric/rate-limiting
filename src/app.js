'use strict';
// @flow
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');

// Routes
const index = require('./routes/index');

// Middlewares
const rateLimiting = require('./middlewares/rate-limiting');

const app = express();
const env = process.env.NODE_ENV;
const config = require('../config.json')[env || 'development'];
const { port } = config.node;

const webpackConfig = require('../webpack/webpack.config');
const compiler = webpack(webpackConfig);

if (env === 'development') {
  // Use in dev only
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
  }));

  app.use(webpackHotMiddleware(compiler));
}

// Serve static files
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, '../app/assets')));

app.use(bodyParser.json());      // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({  // to support URL-encoded bodies
  extended: true
}));

// Apply middlewares
app.use(rateLimiting);

// Add routes to the middlewares stack
app.use('/', index);

const server = app.listen(port, (req, res) => {
  console.log(`Server listening on ${port}`);
});

module.exports = server;