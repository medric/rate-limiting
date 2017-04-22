'use strict';
const path = require('path');
const webpack = require('webpack');

const getPlugins = require('./plugins');
const nodeEnv = process.env.NODE_ENV || 'development';

const paths = {
    context: path.resolve(__dirname, '..', 'app'),
    output:  path.resolve(__dirname, '..', 'dist'),
}

// Expose
module.exports = {
    context: paths.context,
    entry: {
        js: [
            './index'
        ],
        vendor: [
            'react', 'react-dom'
        ]
    },
    output: {
      path: paths.output,
      filename: '[file].bundle.js',
      sourceMapFilename: '[file].map'
    },
    module: {
        loaders: [
          {
            test: /\.scss$/,
            loader: 'style!css!sass?includePaths[]=' + path.resolve(__dirname, '../node_modules/compass-mixins/lib')
          },
          {
            test: /\.js$/, // Transform all .js files required somewhere within an entry point
            loader: 'babel', // 'babel-loader' is also a legal name to reference
            exclude: [
                path.join(__dirname, '../node_modules/'),
                path.join(__dirname, '../dist/')
            ]
          },
          {
            test: /\.(jpg|png|gif|svg)$/,
            loader: 'file'
          }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            path.resolve('./client'),
            'node_modules'
        ]
    },
    plugins: getPlugins()
}