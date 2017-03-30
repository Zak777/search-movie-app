'use strict';

const NODE_ENV = process.env.NODE_ENV || 0;
const webpack = require('webpack');
const rimraf = require('rimraf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function addHash(template, hash) {
    return NODE_ENV == 1 ?
        template.replace(/\.[^.]+$/, `.[${hash}]$&`) : `${template}?hash=[${hash}]`;
}

module.exports = {

    context: __dirname + '/app',

    entry: {
        main: './main',
        styles: './styles'
    },

    output: {
        path: __dirname + '/dist',
        publicPath: '',
        filename: addHash('[name].min.js', 'hash')
    },

    resolve: {
        extensions: ['', '.js', '.styl']
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
                }
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('css!stylus?resolve url')
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: 'index.html'
        }),
        new ExtractTextPlugin(addHash('[name].css', 'contenthash'), {allChunks: true}),
        new CopyWebpackPlugin([{from: 'img/', to: 'img/'}, {from: 'css/', to: 'css/'}])
    ]
};

if (NODE_ENV == 0) {
    module.exports.plugins.push(new webpack.OldWatchingPlugin())
}

if (NODE_ENV == 1) {
    module.exports.plugins.push({
            apply: (compiler) => {
                rimraf.sync(compiler.options.output.path);
            }
        },
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}