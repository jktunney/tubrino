'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
    target: 'web',
    debug: true,
    devtool: 'source-map',
    context: __dirname,
    entry: {
        tuber: './bundleEntry.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    },
    plugins: []
};