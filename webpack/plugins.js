const webpack = require('webpack');
const path = require("path");

function getPlugins() {

    const plugins = [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ];

    return plugins;
}

module.exports = getPlugins;