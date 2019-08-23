const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                autoprefixer(),
                            ],
                        },
                    },
                ],
            },
            {
                test: /.jsx?$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env', '@babel/react'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-proposal-class-properties'],
                    },
                },
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                    },
                },
            }],
    },    
    plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html' }),
        new UglifyJsPlugin(),
    ],
    resolve: {
        extensions: [".js", ".json", ".jsx"],
    },
};